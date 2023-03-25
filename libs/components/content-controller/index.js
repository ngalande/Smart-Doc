import { AnimatePresence, MotiView } from 'moti'
import React from 'react'
import { View } from 'react-native'
import ErrorAlert from '../alert/error'
import Loading from '../loading'

//todo add a slide to refresh view on the cotent controller
function ContentController({ data, error, loading, children, full = true, style }) {

    return (
        <View style={[{ width: '100%' }, full && { height: '100%' }, style]}>
            <AnimatePresence>

                {
                    loading ?
                        <MotiView
                            from={{ opacity: 1 }}
                            key={'loading'}
                            exit={{ opacity: 0 }}
                        >
                            <Loading fullScreen={full} />
                        </MotiView>
                        :
                        <MotiView
                            from={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                opacity: {
                                    type: 'timing',
                                    duration: 600
                                }
                            }}
                            key={'data'}>
                            {error ?
                                <View
                                    style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                    <ErrorAlert isShown={error} />
                                </View>

                                :
                                (data && children)
                            }
                        </MotiView>
                }
            </AnimatePresence>
        </View>
    )
}

export default ContentController