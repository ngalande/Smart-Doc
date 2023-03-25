import React from 'react';
import PropTypes from 'prop-types';
import profilePNG from './images/profile.webp'
import { Avatar as Component } from '@ui-kitten/components'
const Avatar = ({ source, style }) => {


    return (
        <Component
            source={source ? { uri: source } : profilePNG}
            style={style}
        />
    );
};

export default Avatar;