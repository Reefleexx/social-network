import React from 'react'
import classes from './Button.module.scss'

const Button = (props) => {

    const cls = [
        classes.Button,
        classes[props.type],
        props.size ? classes['text_' + props.size]: ''
    ]

    return(
        <button
            className={cls.join(' ')}
            type={props.typeOfAction}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}

export default Button