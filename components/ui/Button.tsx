import Link from 'next/link'
import React, { ReactChild } from 'react'
import classes from './Button.module.css'

interface ButtonProps {
    children: ReactChild;
    link?: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
    if (!!props.link) {
        return (
            <Link href={props.link} >
                <a className={classes.btn}>
                    {props.children}
                </a>
            </Link>
        )
    }

    return <button className={classes.btn} onClick={props.onClick} >{props.children}</button>
}

export default Button

/**
 * Link auto create a <a/> tag.
 * If you wanna create a custom link, you must create <a/> manually 
 */