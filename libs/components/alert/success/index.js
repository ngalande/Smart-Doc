import React from 'react';
import Alert from '..'

const SuccessAlert = ({ isShown, title, content, showDismiss }) => {
    return (

        <Alert

            showDismiss={showDismiss}
            isShown={isShown}
            variant='success'
            title={title}
            content={content}
        />
    );
};



export default SuccessAlert;