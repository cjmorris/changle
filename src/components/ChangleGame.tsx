import { useState } from "react"

import ChangleRow from "./ChangleRow"

import { v4 as uuidv4 } from 'uuid';

export default function ChangleGame() {
    const [words,setWords] = useState(Array(6).fill(''));
    const changeAmounts = [1,2,3,2,1,0];

    return (
        <div className="gamePanel">
            <div className="changleGame">
                {words.map((value: String, index: number) => (
                    <ChangleRow key={uuidv4()} word={value} changeAmount={changeAmounts[index]}/>
                ))}
            </div>
        </div>
    )
}