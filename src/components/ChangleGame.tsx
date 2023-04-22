import { useState, useEffect } from "react"

import ChangleRow from "./ChangleRow"

import { v4 as uuidv4 } from 'uuid';

export default function ChangleGame() {
    const [words,setWords] = useState<string[]>(Array(6).fill(""))
    const [currentRow,setCurrentRow] =  useState(0);
    
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true)
    }, [])

    function detectKeyDown(event: KeyboardEvent){
        if(event.key >= 'a' && event.key <= 'z'){
            handleAddLetter(event.key.toUpperCase())
        }
        console.log(event.key)
        if(event.key === 'Backspace'){
            handleRemoveLetter()
        }
    }

    function handleAddLetter(key: string){
        setWords((prevWords) => {
            const newWords = [...prevWords]
            if(newWords[currentRow].length < 5){
                newWords[currentRow] += key
            }
            return newWords
        })
    }

    function handleRemoveLetter(){
        setWords((prevWords) => {
            const newWords = [...prevWords]
            if(newWords[currentRow].length > 0){
                newWords[currentRow] = newWords[currentRow].slice(0, newWords[currentRow].length-1)
            }
            return newWords
        })
    }
    
    const changeAmounts = [1,2,3,2,1,0];
    

    return (
        <div className="gamePanel">
            <div className="changleGame">
                {words.map((value: string, index: number) => (
                    <ChangleRow key={uuidv4()} word={value} changeAmount={changeAmounts[index]}/>
                ))}
            </div>
        </div>
    )
}