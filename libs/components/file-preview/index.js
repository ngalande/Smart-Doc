import React, { useContext, useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Icon, Modal, Text } from '@ui-kitten/components'
import PreviewContext from './PreviewContext'
import { AnimatePresence, MotiView } from 'moti'
import ItemPreview from './item'


export default function FilePreview({ style, label, children, showDelete, onDelete, files, preview = true }) {


    const { setPreviewFile, navigation: mainNavigation } = useContext(PreviewContext)


    function handleDelete(index) {
        const items = [...files]
        items.splice(index, 1)
        onDelete && onDelete(items)
    }

    return (
        <>
            <View style={[styles.container, style]}>
                <Text
                    style={{ color: '#718096', marginBottom: 8, textAlign: 'center' }}
                    category='s2'>{label}</Text>

                <View style={styles.filesContainer}>
                    <AnimatePresence>

                        {files?.map((item, index) => {
                            return (item && item.file) ?
                                <ItemPreview
                                    key={index}
                                    index={index}
                                    item={item}
                                    showDelete={showDelete}
                                    onDelete={handleDelete}
                                    onPress={() => {
                                        if (preview) {
                                            setPreviewFile(item)
                                            mainNavigation && mainNavigation.navigate('File Preview')
                                        }
                                    }}
                                />
                                :
                                <View />
                        })
                        }
                    </AnimatePresence>
                </View>

                <View style={[styles.childrenContainer, files?.length <= 0 ? {} : { marginTop: 16 }]}>
                    {children}
                </View>
            </View >
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 8

    },
    filesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'

    },
    childrenContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },


})