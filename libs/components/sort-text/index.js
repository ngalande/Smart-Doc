import { Icon, Text } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

const SortText = ({ id, sort, isAscending, onPress, children, alt }) => {
    return (

        <TouchableOpacity
            onPress={() => onPress(id)}
            style={[styles.container, alt ? { flexDirection: 'row-reverse' } : {}]}>

            <Text
                category='s1'
                style={styles.text}
            >{children}</Text>

            {sort(id) &&


                <View>
                    {isAscending === true ?
                        <Icon style={styles.icon}
                            fill='#8F9BB3'
                            name='chevron-up-outline' />

                        :

                        <Icon style={styles.icon}
                        fill='#8F9BB3'
                        name='chevron-down-outline' />

                    }

                </View>
            }

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {

    },
    icon: {
        width: 24,
        height: 24
    }
})

export default SortText;