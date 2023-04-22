import { useState } from "react"

import ChangleRow from "./ChangleRow"

import { v4 as uuidv4 } from 'uuid';

export default function ChangleGame() {
    const [words,setWords] = useState(Array(6).fill(''));

    return (
        <div className="gamePanel">
            <div className="changleGame">
                {words.map((value: String) => (
                    <ChangleRow key={uuidv4()} word={value}/>
                ))}
            </div>
        </div>
    )
}