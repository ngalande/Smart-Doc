import React from 'react'
import { KeyboardAvoidingView as KeyboardAvoidingViewComponent, ScrollView, View } from 'react-native'

const KeyboardAvoidingView = ({ style, position, contentContainerStyle, children }) => {

    return (
        <ScrollView
            // bounces={false}
            contentContainerStyle={[{ flex: 1 }, style]}>

            <KeyboardAvoidingViewComponent
                // keyboardVerticalOffset={100}
                behavior={position ? 'position' : Platform.OS === "ios" ? "padding" : "height"}
                style={[{ flex: 1 }]}>
                <View style={[{ height: '100%' }, contentContainerStyle]}>
                    {children}
                </View>
            </KeyboardAvoidingViewComponent>
    </ScrollView>
    )
}

export default KeyboardAvoidingView