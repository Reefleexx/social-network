import React from 'react'
import classes from './TextArea.module.scss'

const TextArea = (props) => {

    const changeHandler = e => {
        e.preventDefault()
        props.onChange(prev => {
            return {
                ...prev,
                about: e.target.value
            }
        })
    }

    return(
        <div className={classes.wrapper}>
            <label htmlFor={props.label + '123'} className={classes.area_label}>{props.label}</label>
            <textarea id={props.label + '123'} rows={3} onChange={e => changeHandler(e)}>
            </textarea>
        </div>
    )
}

export default TextArea