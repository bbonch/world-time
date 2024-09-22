import { deleteTime } from "~db"

type Props = {
    place: string,
    dateTime: Date,
    timeZone: string
}

const TimeBlock = ({ place, dateTime, timeZone }: Props) => {
    const dateTimeString = dateTime.toLocaleString(undefined, { timeZone: timeZone })
    const dateTimeParts = dateTimeString.split(',')
    const datePart = dateTimeParts[0]
    const timePart = dateTimeParts[1].trimStart()

    async function deleteClicked(): Promise<void> {
        debugger
        await deleteTime(place)
    }

    return (
        <div className="p-4 border-neutral border rounded flex flex-col justify-center items-center relative">
            <button className="absolute top-1 right-1 leading-[0]" type="button" onClick={deleteClicked}>-</button>
            <div>{place}</div>
            <div>{datePart}</div>
            <div>{timePart}</div>
        </div>
    )
}

export default TimeBlock