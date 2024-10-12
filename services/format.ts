import { NON_WORD_REGEX } from "~constants"

export const formatPlace = (place: string): string => {
    return place.replaceAll(NON_WORD_REGEX, ' ')
}