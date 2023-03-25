import React, { useState } from 'react'
import PreviewComponent from './preview'
import PreviewContext from './PreviewContext'

export default function PreviewProvider({ stack, children }) {
    const [previewFile, setPreviewFile] = useState()
    const [navigation, setNavigation] = useState()




    return (
        <PreviewContext.Provider value={{ navigation, setNavigation, previewFile, setPreviewFile }}>
            {children}
        </PreviewContext.Provider>
    )
}
