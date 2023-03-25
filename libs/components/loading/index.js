import { Text } from '@ui-kitten/components';
import { MotiView } from 'moti'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native';


function Loading({ fullScreen, style }) {

   // const loadingRef = useRef()


    useEffect(() => {
       // loadingRef.current.play()
    }, [])
    return (
        <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={[styles.center, fullScreen && styles.fullScreen, style]}>

            <LottieView
            autoPlay
            loop
                //ref={loadingRef}
                style={{
                    width: 100,
                    height: 100,
                    //backgroundColor: 'rgba(255,255,255,00.75)',
                }}
                source={require("./loader.json")}
            />


        </MotiView>)
}

const styles = StyleSheet.create({
    center: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fullScreen: {
        height: '100%',

    },

})

export default Loading