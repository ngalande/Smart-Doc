import * as React from 'react'
import Alert from '..'

const ErrorAlert = ({ isShown,style }) => {
    return (
        <Alert
        style={style}
            variant='error'
            isShown={isShown}
            title={'Error'}
            content={`Oops! something seems to have gone wrong, please try again.`} />

    )
}

export default ErrorAlert