import React, {useState, useEffect} from 'react'
import classes from './Input.module.scss'
import {createForm, isValidCheck} from "../../../bl/formLogic/formLogic";

const Input = (props) => {

    const form = createForm(props.type)

    const htmlFor = `input-${new Date().getTime()}`

    const [error, errorHandler] = useState('')
    const [prevError, prevHandler] = useState('')
    const [value, valueChange] = useState('')

    const onChange = (e = {target: {value: ''}}) => {
        valueChange(e.target.value)
        errorHandler(isValidCheck(e.target.value, props.type))
        console.log(props.error)
        props.errorToggler(false)
    }

    useEffect(() => {
        if (props.error) {
            if (value === '') {
                prevHandler('This field cannot be empty')
            } else {
                prevHandler(error)
            }
        }
    }, [props, error])

    const cls = [
        classes.wrapper
    ]

    if (props.class) cls.push(classes[props.class])

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor} className={classes.input_label}>{form.label}</label>
            <input
                id={htmlFor}
                type={form.type}
                value={value}
                placeholder={form.placeholder}
                className={classes.input_item}
                onChange={e => onChange(e)}
            />
            {
                prevError ? <span className={classes.input_error}>{prevError}</span> :
                    null
            }
        </div>
    )
}

export default Input