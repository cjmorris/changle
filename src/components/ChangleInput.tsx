interface IProps {
    letter: String
}

export default function ChangleInput(props: IProps) {
    
    return (
        <div className="changleInput">
            {props.letter}
        </div>
    )
}