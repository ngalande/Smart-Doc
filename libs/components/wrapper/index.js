import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';


const Wrapper = ({ onPress, isGray, children, style  }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[style, isGray ? { backgroundColor: 'rgba(249,250,251)' } : { backgroundColor: 'white' }]}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {

    }
})

export default Wrapper;