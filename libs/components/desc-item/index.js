import { Text } from '@ui-kitten/components'
import { animate } from 'framer-motion'
import { MotiView } from 'moti'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function DescItem({ title, content, hide, children, roundedTop, roundedBottom }) {
    return (
        hide && !content ?
            <View />
            :
            <MotiView
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={[styles.container, roundedTop ? styles.roundedTop : {}, roundedBottom ? styles.roundedBottom : {}]}>

                <Text category='s2' style={styles.title}>{title ? title.toString() : ' '}</Text>

                {children ? children :
                    <Text appearance='hint' category='p2' style={styles.content}>
                        {
                            (typeof content !== 'undefined' && content)
                                ?
                                (content.length > 0
                                    ?
                                    content.toString()
                                    :
                                    ' '
                                )
                                :
                                '--'
                        }</Text>
                }

            </MotiView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        marginBottom: 0.4,
        marginLeft: 16,
        marginRight: 16,
        padding: 16
    },
    title: {

    },
    content: {

    },
    roundedTop: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    roundedBottom: {
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8
    }
})