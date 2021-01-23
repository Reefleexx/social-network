import React, {useState, useEffect} from 'react'
import classes from './Input.module.scss'
import {isValid} from "../../bl/formLogic/formLogic";

const Inputs = (props) => {

    const [inputValues, changeValue] = useState(props.forms.reduce((result, form) => {
            result[form.name] = {
                value: ''
            }
            return result
        }, {}))

    // const [error, errorHandler] = useState(props.forms.reduce((result, form) => {
    //     result[form.name] = ''
    //     return result
    // }, {}))

    const htmlFor = i => `${props.forms[i].name}-${new Date().getTime()}`

    const onChange = (e, name) => {
        e.preventDefault()
        changeValue((prev) => {

            const element = {...inputValues[name]}

            const newElement = {...element, value: e.target.value}

            return {
                ...prev,
                [name]: newElement
            }
        })
    }

    useEffect(() => {
        // const val = Object.keys(inputValues).reduce((result, formName, i) => {
        //
        //     const error = isValid(inputValues[formName].value, props.forms[i].validations)
        //     console.log(error)
        //     errorHandler((prev) => {
        //         return {
        //             ...prev,
        //             [formName]: error
        //         }
        //     })
        //
        //     const valid = !error && result
        //     return valid
        //
        // }, true)
        // console.log(val)
        // props.validChange(val)
    }, [inputValues, props])
    console.log(props.errors.email)
    return(
        <div className={classes.Input }>
            {props.forms.map((form, index) => {
                return (
                    <div className={classes.inputForm} key={index}>
                        <label className={classes.Label + ' ' + classes[props.class]} htmlFor={htmlFor(index)}>{form.label}</label>
                        <div className={classes.inputWrapper}>
                            <input
                                type={form.type}
                                id={htmlFor(index)}
                                value={inputValues[form.name].value}
                                onChange={(e) => onChange(e, form.name)}
                            />
                            {
                                props.errors[form['name']] ?
                                <span className={classes.error}>{props.errors[form.name]}</span> :
                                null
                            }

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Inputs