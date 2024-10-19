import 'style.css'
import { useEffect, useRef, useState } from 'react'
import { getTimes } from '~db'
import TimeBlock from '~components/time-block'
import type { Time } from '~types'
import TimeBlockAdd from '~components/time-block-add'
import { Storage } from '@plasmohq/storage'
import { TIMES_STORAGE_KEY } from '~constants'

function Popup() {
  const [times, setTimes] = useState<Array<Time>>([])
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date())
  const interval = useRef<NodeJS.Timeout>()
  const storage = new Storage()

  const updateTimes = async () => {
    const times = await getTimes()
    setTimes(times)
  }

  useEffect(() => {
    interval.current = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)
    updateTimes()
    storage.watch({
      [TIMES_STORAGE_KEY]: (n) => {
        setTimes(n.newValue)
      }
    })

    return () => {
      clearInterval(interval.current)
      storage.unwatchAll()
    }
  }, [])

  const timeBlocks = times.map((time) => {
    return <TimeBlock key={time.place} place={time.place} timeZone={time.timeZone} dateTime={currentDateTime} />
  })

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {times.length > 0 &&
        <>
          {timeBlocks}
        </>
      }
      <TimeBlockAdd />
    </div>
  )
}

export default Popup