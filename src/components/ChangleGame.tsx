import { useState, useEffect } from "react"

import ChangleRow from "./ChangleRow"

import { v4 as uuidv4 } from 'uuid';

export default function ChangleGame() {
    const NUM_OF_ROWS = 6;
    const [wordState,setWordState] = useState<{words: string[], currentRow: number}>({words: Array(NUM_OF_ROWS).fill(""), currentRow: 0})

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
            if(prevState.words[prevState.currentRow].length < 5){
                newWords[prevState.currentRow] += key
            }
            return {...prevState, words: newWords}
        })
    }

    function handleRemoveLetter(){
        setWordState(prevState => {
            const newWords = prevState.words.slice();
            if(prevState.words[prevState.currentRow].length > 0){
                newWords[prevState.currentRow] = prevState.words[prevState.currentRow].slice(0, prevState.words[prevState.currentRow].length-1)
            }
            return {...prevState, words: newWords}
        })
    }

    function handleEnterWord(){
        setWordState(prevState => {
            return {...prevState, currentRow: prevState.currentRow < NUM_OF_ROWS-1 ? prevState.currentRow + 1 : prevState.currentRow}
        })
    }
    
    const changeAmounts = [1,2,3,2,1,0];
    

    return (
        <div className="gamePanel">
            <div className="changleGame">
                {wordState.words.map((value: string, index: number) => (
                    <ChangleRow key={uuidv4()} word={value} changeAmount={changeAmounts[index]}/>
                ))}
            </div>
        </div>
    )
}