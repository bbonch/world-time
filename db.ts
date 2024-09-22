import type { Time } from "~types"
import { Storage } from "@plasmohq/storage"
import { TIMES_STORAGE_KEY } from "~constants"

const defaultTimes: Array<Time> = [
    { place: 'London', timeZone: 'Europe/London' },
    { place: 'Moscow', timeZone: 'Europe/Moscow' },
    { place: 'New York', timeZone: 'America/New_York' },
    { place: 'Tokyo', timeZone: 'Asia/Tokyo' }
]

export const getTimes = async () => {
    const storage = new Storage()

    const times = await storage.get<Array<Time>>(TIMES_STORAGE_KEY)
    if (times == undefined) {
        await storage.set(TIMES_STORAGE_KEY, defaultTimes)
        return defaultTimes
    }

    return times
}

export const getAllTimes: () => Array<Time> = () => {
    const timeZones = Intl.supportedValuesOf('timeZone');
    const times: Array<Time> = timeZones.map((tz) => {
        const tzParts = tz.split('/')
        return {
            place: tzParts[1],
            timeZone: tz
        }
    })

    return times
}

export const addTime = async (time: Time) => {
    const storage = new Storage()

    const times = await storage.get<Array<Time>>(TIMES_STORAGE_KEY)
    times.push(time)
    await storage.set(TIMES_STORAGE_KEY, times)
}

export const deleteTime = async (place: string) => {
    const storage = new Storage()

    const times = await storage.get<Array<Time>>(TIMES_STORAGE_KEY)
    const updatedTimes = times.filter((time) => {
        return time.place != place
    });
    await storage.set(TIMES_STORAGE_KEY, updatedTimes)
}