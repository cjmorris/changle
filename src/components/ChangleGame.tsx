import { useState, useEffect } from "react"

import ChangleRow from "./ChangleRow"
import ALLOWED_GUESS_LIST from "../word_lists/guess_list"

import { v4 as uuidv4 } from 'uuid';

interface ChangleWord{
    word: string,
    statuses: string[]
}

interface IProps {
    answer: string
}

export default function ChangleGame(props: IProps) {
    const changeAmounts = [1,2,3,2,1,0];

    const WORD_LENGTH = 5;
    const NUM_OF_ROWS = 6;
    
    const [wordState,setWordState] = useState<{words: ChangleWord[], currentRow: number}>({
        words: Array(NUM_OF_ROWS).fill(null).map(() => (
            {
                word: "",
                statuses: Array(WORD_LENGTH).fill("status-uncommited")
            })
        ), 
        currentRow: 0
    })

    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown)
        return () => {
            document.removeEventListener('keydown', detectKeyDown)
        }
    }, [])

    function detectKeyDown(event: KeyboardEvent){
        if(event.key >= 'a' && event.key <= 'z'){
            handleAddLetter(event.key.toUpperCase())
        }else if(event.key === 'Backspace'){
            handleRemoveLetter()
        }else if(event.key === 'Enter'){
            handleEnterWord()
        }
    }

    function handleAddLetter(key: string){
        setWordState(prevState => {
            const newWords = prevState.words.map(changleWord => {return {...changleWord}})
            if(prevState.words[prevState.currentRow].word.length < WORD_LENGTH){
                newWords[prevState.currentRow].word += key
            }
            return {...prevState, words: newWords}
        })
    }

    function handleRemoveLetter(){
        setWordState(prevState => {
            const newWords = prevState.words.map(changleWord => {return {...changleWord}})
            if(prevState.words[prevState.currentRow].word.length > 0){
                newWords[prevState.currentRow].word = prevState.words[prevState.currentRow].word.slice(0, prevState.words[prevState.currentRow].word.length-1)
            }
            return {...prevState, words: newWords}
        })
    }

    function handleEnterWord(){
        setWordState(prevState => {
            if(prevState.words[prevState.currentRow].word.length === WORD_LENGTH){
                if(checkWordIsAllowed(prevState.words[prevState.currentRow].word)){
                    const newWords = prevState.words.map(changleWord => {return {...changleWord}})
                    if(checkWordIsCorrect(prevState.words[prevState.currentRow].word)){
                        newWords[prevState.currentRow].statuses = Array(WORD_LENGTH).fill("status-correctPosition");
                    }else{
                        const mutatedWord = changeWord(prevState.words[prevState.currentRow].word,changeAmounts[prevState.currentRow])
                        newWords[prevState.currentRow].word = mutatedWord;
                        newWords[prevState.currentRow].statuses = checkWord(mutatedWord)
                    }
                    return {
                        ...prevState, 
                        currentRow: prevState.currentRow < NUM_OF_ROWS-1 ? prevState.currentRow + 1 : prevState.currentRow,
                        words: newWords
                    }
                }
            }
            return prevState
        })
    }

    function checkWordIsAllowed(guess: string): boolean{
        for(let i = 0; i < ALLOWED_GUESS_LIST.length; i++){
            if(ALLOWED_GUESS_LIST[i].toUpperCase() === guess){
                return true
            }
        }
        return false
    }

    function checkWordIsCorrect(guess: string): boolean{
        return props.answer === guess
    }

    function checkWord(guess: string): string[]{        
        const CORRECT = "status-correctPosition";
        const WRONGPOS = "status-wrongPosition";
        const NOTINWORD = "status-notInWord";
        if(checkWordIsCorrect(guess)){
            return Array(WORD_LENGTH).fill(CORRECT)
        }else{
            const statuses: string[] = Array(WORD_LENGTH).fill(null)
            const used: boolean[] = Array(WORD_LENGTH).fill(false)
            for(let i = 0; i < WORD_LENGTH; i++){
                if(props.answer[i] === guess[i]){
                    statuses[i] = CORRECT
                    used[i] = true
                }
            }
            //Looping through letters in the guess
            for(let i = 0; i < WORD_LENGTH; i++){
                if(statuses[i] === null){
                    //Looping through letters in the answer
                    for(let j = 0; j < WORD_LENGTH; j++){
                        if(!used[j] && guess[i] === props.answer[j]){
                            statuses[i] = WRONGPOS
                            used[j] = true
                            break
                        }
                    }
                }
            }
            for(let i = 0; i < WORD_LENGTH; i++){
                if(statuses[i] === null){
                    statuses[i] = NOTINWORD
                }
            }
            return statuses;
        }
    }

    function changeWord(initialGuess: string, changeAmount: number): string{
        const possibleWords = []
        for(let i = 0; i < ALLOWED_GUESS_LIST.length; i++){
            let matchingLetters = 0
            for(let j = 0; j < WORD_LENGTH; j++){
                if(ALLOWED_GUESS_LIST[i][j].toUpperCase() === initialGuess[j]){
                    matchingLetters++
                }
            }
            if(WORD_LENGTH-matchingLetters === changeAmount){
                possibleWords.push(ALLOWED_GUESS_LIST[i].toUpperCase())
                console.log(ALLOWED_GUESS_LIST[i].toUpperCase())
            }
        }
        if(possibleWords.length > 0){
            const newWordIndex: number = Math.floor(Math.random()*possibleWords.length)
            return possibleWords[newWordIndex]
        }
        return initialGuess
    }

    return (
        <div className="gamePanel">
            <div className="changleGame">
                {wordState.words.map((value: ChangleWord, index: number) => (
                    <ChangleRow key={uuidv4()} word={value.word} changeAmount={changeAmounts[index]} statuses={value.statuses}/>
                ))}
            </div>
        </div>
    )
}