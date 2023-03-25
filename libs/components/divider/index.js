import { Divider as Component } from '@ui-kitten/components'
import React from 'react'

export default function Divider({ style }) {
    return (
        <Component style={[{ backgroundColor: '#F7FAFC' }, style]} />
    )
}
