import React, {useState, useEffect} from 'react'
import classes from './Input.module.scss'
import {createForm, isValidCheck} from "../../../bl/formLogic";

const Input = (props) => {

    const cls = [
        classes.wrapper
    ]

    if (props.class) cls.push(classes[props.class])

    const form = createForm(props.type)

    const htmlFor = `input-${new Date().getTime()}`

    const [error, errorHandler] = useState('')
    const [prevError, prevHandler] = useState('')
    const [value, valueChange] = useState('')
    const [isPasswordVisible, changeVisibility] = useState(false)

    const onChange = (e = {target: {value: ''}}) => {
        const value = e.target.value

        valueChange(value)

        props.onChange(prev => {
            return {
                ...prev,
                [props.type]: value
            }
        })

        const isValid = isValidCheck(value, props.type)

        props.validChange(prev => {
            return {
                ...prev,
                [props.type]: !!!isValid
            }
        })

        errorHandler(isValid)
        props.errorToggler(false)
    }

    const onEyeClick = (e) => {
        e.preventDefault()
        changeVisibility(!isPasswordVisible)
    }

    useEffect(() => {
        if (props.error) {
            if (value === '') {
                if (props.type !== 'about') {
                    prevHandler('This field cannot be empty')
                }
            } else {
                prevHandler(error)
            }
        }
    }, [props, error])

    useEffect(() => {}, )

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor} className={classes.input_label}>{form.label}</label>
            <div className={classes.input_block}>
                <input
                    id={htmlFor}
                    type={form.type === 'password' ? isPasswordVisible ? 'text' : 'password' : form.type}
                    value={value}
                    placeholder={form.placeholder}
                    className={classes.input_item}
                    onChange={e => onChange(e)}
                />
                {
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    props.type === 'password' && <i className={`fa fa-eye${isPasswordVisible ? '' : '-slash'}`}
                                                    aria-hidden="true"
                                                    onClick={(event) => onEyeClick(event)}/>
                }
            </div>
            {
                prevError ? <span className={classes.input_error}>{prevError}</span> :
                    null
            }
        </div>
    )
}

export default Input