import React, { useContext } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import PreviewContext from '../PreviewContext'

function PreviewComponent(props) {

    const { previewFile } = useContext(PreviewContext)

    return (
        <View style={styles.container}>

            {previewFile &&
                <Image
                    style={styles.previewImage}
                    source={{ uri: previewFile.file }} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'black'
    },
    previewImage: {
        height: undefined,
        width: '100%',
        backgroundColor: '#E2E8F0',
        aspectRatio: 1
    },
})

export default PreviewComponent

