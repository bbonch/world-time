import type { Time } from "~types"
import { Storage } from "@plasmohq/storage"
import { ALREADY_ADDED_ERROR, TIMES_STORAGE_KEY } from "~constants"
import { formatPlace } from "~services/format"

const defaultTimes: Array<Time> = [
    { place: 'London', timeZone: 'Europe/London' },
    { place: 'Moscow', timeZone: 'Europe/Moscow' },
    { place: 'New_York', timeZone: 'America/New_York' },
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
            place: formatPlace(tzParts[tzParts.length - 1]),
            timeZone: tz
        }
    })
    times.sort((a, b) => {
        if (a.place > b.place) {
            return 1
        } else if (a.place < b.place) {
            return -1
        } else {
            return 0
        }
    })

    return times
}

export const addTime = async (time: Time): Promise<string> => {
    const storage = new Storage()

    const times = await storage.get<Array<Time>>(TIMES_STORAGE_KEY)
    if (times.some((t) => {
        return t.place == time.place
    })) {
        return ALREADY_ADDED_ERROR
    }

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