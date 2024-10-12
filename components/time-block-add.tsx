import { memo, useMemo, useState, type ChangeEvent } from "react"
import { addTime, getAllTimes } from "~db"

const TimeBlockAdd = () => {
    const [isAddMode, setIsAddMode] = useState<boolean>(false)
    const allTimes = useMemo(() => getAllTimes(), [])
    const [selectedTimeZone, setSelectedTimeZone] = useState<string>(allTimes[0].timeZone)
    const [error, setError] = useState<string>('')

    async function addClicked() {
        const tzParts = selectedTimeZone.split('/')
        const error = await addTime({
            timeZone: selectedTimeZone,
            place: tzParts[1]
        })

        if (!error) {
            setIsAddMode(false)
        } else {
            setError(error)
        }
    }

    function timeZoneChanged(event: ChangeEvent<HTMLSelectElement>): void {
        setSelectedTimeZone(event.target.value)
    }

    return (
        <div className="p-4 border rounded flex flex-col justify-center items-center h-[88px]">
            {!isAddMode &&
                <div onClick={() => {
                    setError('')
                    setIsAddMode(true)
                }}><button type="button">+</button></div>
            }
            {isAddMode &&
                <>
                    <select onChange={timeZoneChanged} className="w-full focus:outline-none">
                        {allTimes.map((t) => {
                            return <option key={t.timeZone} value={t.timeZone}>{t.place}</option>
                        })}
                    </select>
                    <div className="flex gap-1 mt-1">
                        <button className="rounded border p-1" type="button" onClick={() => {
                            setSelectedTimeZone(allTimes[0].timeZone)
                            setIsAddMode(false)
                        }}>Cancel</button>
                        <button className="rounded border p-1" type="button" onClick={addClicked}>Add</button>
                    </div>
                    {error != '' &&
                        <div className="text-red-500">{error}</div>
                    }
                </>
            }
        </div>
    )
}

const MemoTimeBlockAdd = memo(TimeBlockAdd)

export default MemoTimeBlockAdd