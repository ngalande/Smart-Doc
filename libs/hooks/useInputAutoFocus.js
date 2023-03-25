import React, { useEffect, useRef } from "react"


/**
 * automatically focuses to the next input when submit is pressed on the input
 * @param{Array} inputRefs - array of the refs of the inputs arranged in the order that they are to go to next
 */
const useInputAutoFocus = ({ inputRefs }) => {


    /**
     * 
     * @param {int} index - the index of the inputs ref in the array
     */
    const onSubmitEditing = (index) => {
        if (index === inputRefs.length - 1) return

        inputRefs[index + 1].current.focus()
    }

    return { onSubmitEditing }
}

export default useInputAutoFocus