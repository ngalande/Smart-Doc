import { Text } from '@ui-kitten/components'
import { MotiView } from 'moti'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'

const getColors = (variant) => {
    switch (variant) {
        case 'warning':
            return {
                containerStyle: { backgroundColor: '#FEF3C7' },
                titleStyle: { color: '#78350F' },
                contentStyle: { color: '#92400E' }
            }

        case 'error':
            return {
                containerStyle: { backgroundColor: '#FEE2E2' },
                titleStyle: { color: '#7F1D1D' },
                contentStyle: { color: '#991B1B' }

            }
        case 'success':
            return {
                containerStyle: { backgroundColor: '#D1FAE5' },
                titleStyle: { color: '#064E3B' },
                contentStyle: { color: '#065F46' }


            }
        case 'info':
            return {
                containerStyle: { backgroundColor: '#DBEAFE' },
                titleStyle: { color: '#1E3A8A' },
                contentStyle: { color: '#1E40AF' }
            }
    }
}

const Alert = ({ title, content, isShown, variant = 'info', style }) => {

    const variantStyle = getColors(variant)

    return (

        isShown ?
            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <View style={[styles.container, variantStyle.containerStyle, style]}>

                    {title && <Text style={[{ width: '100%' }, variantStyle.titleStyle]} category='s1'>{title}</Text>}
                    {content && <Text style={variantStyle.contentStyle} category='p2'>{content}</Text>}

                </View>
            </MotiView>
            :
            <View />

    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 24,
        width: '100%',
        alignItems: 'center'
    }
})
export default Alert