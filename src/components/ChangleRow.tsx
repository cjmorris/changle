import ChangleInput from "./ChangleInput"

export default function ChangleRow() {
    return (
        <div className="changleRow">
            <ChangleInput/>
            <ChangleInput/>
            <ChangleInput/>
            <ChangleInput/>
            <ChangleInput/>
            <div className="changleInput changeAmount">
                1
            </div>
        </div>
    )
}