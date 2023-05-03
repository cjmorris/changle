interface IProps {
    letter: string
    status: string
}

export default function ChangleInput(props: IProps) {
    
    return (
        <div className={`changleInput ${props.status}`}>
            {props.letter}
        </div>
    )
}