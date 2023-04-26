import { useState, useEffect } from "react"

import ChangleRow from "./ChangleRow"

import { v4 as uuidv4 } from 'uuid';

export default function ChangleGame() {
    const [wordState,setWordState] = useState<{words: string[], currentRow: number}>({words: Array(6).fill(""), currentRow: 0})
    
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
        const newWordState = {...wordState}
        if(wordState.words[wordState.currentRow].length < 5){
            newWordState.words[wordState.currentRow] += key
        }
        setWordState(newWordState)
    }

    function handleRemoveLetter(){
        const newWordState = {...wordState}
        if(wordState.words[wordState.currentRow].length > 0){
            newWordState.words[wordState.currentRow] = wordState.words[wordState.currentRow].slice(0, wordState.words[wordState.currentRow].length-1)
        }
        setWordState(newWordState)
    }

    function handleEnterWord(){
        const newWordState = {...wordState, currentRow: wordState.currentRow+1}
        setWordState(newWordState)
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