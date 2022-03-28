import React, { ReactChild } from 'react'
import classes from './ErrorAlert.module.css';

interface ErrorAlertProps {
    children: ReactChild
}

const ErrorAlert: React.FC<ErrorAlertProps> = (props) => {
    return (
        <div className={classes.alert}>{props.children}</div>
    )
}

export default ErrorAlert