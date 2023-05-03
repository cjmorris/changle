import { useState, useEffect } from "react"

import ChangleRow from "./ChangleRow"

import { v4 as uuidv4 } from 'uuid';

interface ChangleWord{
    word: string,
    statuses: string[]
}

export default function ChangleGame() {
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
            const newWords = prevState.words.slice();
            if(prevState.words[prevState.currentRow].word.length < WORD_LENGTH){
                newWords[prevState.currentRow].word += key
            }
            return {...prevState, words: newWords}
        })
    }

    function handleRemoveLetter(){
        setWordState(prevState => {
            const newWords = prevState.words.slice();
            if(prevState.words[prevState.currentRow].word.length > 0){
                newWords[prevState.currentRow].word = prevState.words[prevState.currentRow].word.slice(0, prevState.words[prevState.currentRow].word.length-1)
            }
            return {...prevState, words: newWords}
        })
    }

    function handleEnterWord(){
        setWordState(prevState => {
            if(prevState.words[prevState.currentRow].word.length === WORD_LENGTH){
                const newWords = prevState.words.slice()
                newWords[prevState.currentRow].statuses = getStatuses()
                return {
                    ...prevState, 
                    currentRow: prevState.currentRow < NUM_OF_ROWS-1 ? prevState.currentRow + 1 : prevState.currentRow,
                    words: newWords
                }
            }else{
                return prevState
            }
            
        })
    }

    function getStatuses(): string[]{
        return ["status-notInWord","status-wrongPosition","status-notInWord","status-notInWord","status-correctPosition"]
    }
    
    const changeAmounts = [1,2,3,2,1,0];
    

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