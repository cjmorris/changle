import ChangleInput from "./ChangleInput"

import { v4 as uuidv4 } from 'uuid';

interface IProps {
    word: String,
    changeAmount: number
}

export default function ChangleRow(props: IProps) {
    const inputs = []
    for (let i = 0; i < 5 ; i++){
        inputs[i] = <ChangleInput key={uuidv4()} letter={props.word[i]}/>
    }

    return (
        <div className="changleRow">
            {inputs}
            <div className="changleInput changeAmount">
                {props.changeAmount}
            </div>
        </div>
    )
}