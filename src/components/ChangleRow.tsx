import ChangleInput from "./ChangleInput"

interface IProps {
    word: String
}

export default function ChangleRow(props: IProps) {
    return (
        <div className="changleRow">
            <ChangleInput letter={props.word[0]}/>
            <ChangleInput letter={props.word[1]}/>
            <ChangleInput letter={props.word[2]}/>
            <ChangleInput letter={props.word[3]}/>
            <ChangleInput letter={props.word[4]}/>
            <div className="changleInput changeAmount">
                1
            </div>
        </div>
    )
}