import React from 'react'
import { Button as Component, Spinner } from '@ui-kitten/components'
import { View } from 'react-native'


const Button = (props) => {
    return (
        <Component

            {...props}
            onPress={() => {
                console.log("button pressed")
                !props.loading && props.onPress && props.onPress()
            }}
            accessoryLeft={viewProps => props.loading ?
                <View style={[viewProps.style]}>
                    <Spinner size='small' status='basic' />
                </View>
                :
                (props.accessoryLeft ? props.accessoryLeft : null)}
        >{props.loading ? '' : props.children}</Component>
    )
}

export default Button
