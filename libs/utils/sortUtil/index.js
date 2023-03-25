
/**
 * 
 * @param {String || Date} dateA 
 * @param {String || Date} dateB 
 * @param {Boolean} ascending 
 */
export const sortDate = (dateA, dateB, ascending) => {
    const timeA = new Date(dateA).getTime()
    const timeB = new Date(dateB).getTime()

    if (!timeA && !timeB) {
        return 0
    } else if (!timeA && timeB) {
        return 1
    } else if (!timeB && timeA) {
        return -1
    }

    return ascending ? timeA - timeB : timeB - timeA
}

export const sortNumber = (numA, numB, ascending) => {

    const a = (numA ? numA : 0)
    const b = (numB ? numB : 0)

    return ascending ? a - b : b - a
}

export const sortText = (textA, textB, ascending) => {
    if (!textA && !textB) {
        return 0
    } else if (!textA && textB) {
        return 1
    } else if (!textB && textA) {
        return -1
    }

    return ascending ? textB.localeCompare(textA) : textA.localeCompare(textB)
}