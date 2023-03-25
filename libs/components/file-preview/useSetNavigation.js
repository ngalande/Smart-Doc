import { useContext, useEffect } from "react"
import PreviewContext from "./PreviewContext"


function useSetNavigation(navigation) {
    const { setNavigation } = useContext(PreviewContext)

    useEffect(() => {
        setNavigation(navigation)
    }, [navigation])
}

export default useSetNavigation