import React from 'react'
import { StyleSheet, View } from 'react-native'

const Card = ({ children, style }) => {
    return (
        <View style={[styles.container, style]}>{children}</View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor:'rgba(229, 231, 235,0.5)',
        borderWidth: 1,
        borderRadius: 8,
        elevation: 3,
        shadowOffset: { width: 1, height: 6 },
        shadowColor: 'rgba(229, 231, 235,1)',
        shadowOpacity: 0.3,
        backgroundColor: 'white',
        shadowRadius: 2,
    }
})

export default Card