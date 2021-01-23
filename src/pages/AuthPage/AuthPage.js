import React, {useState, useEffect} from 'react'
import classes from './AuthPage.module.scss'
import Inputs from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import {withRouter} from "react-router";
import {isValidCheck} from "../../bl/formLogic/formLogic";

export const AuthContext = React.createContext()

const AuthPage = (props) => {

    // const [valid, validChange] = useState(false)
    // const [isSubmit, submitHandler] = useState(false)
    const [error, errorHandler] = useState({
        email: '',
        password: ''
    })

    const forms = [
        {
            label: 'Email',
            name: 'email',
            type: 'email',
            validations: {
                required: true,
                email: true
            }
        },
        {
            label: 'Password',
            name: 'password',
            type: 'password',
            validations: {
                required: true,
                minLength: 6,
                haveCapital: true
            }
        }
    ]

    const onSubmitHandler = e => {
        e.preventDefault()
        console.log(e)
        const values = Object.keys(e.target.form).reduce((result, el) => {

            const element = e.target.form[el]

            if (element.defaultValue || element.defaultValue === '') {
                const id = element.id.split('-')[0]
                result[id] = element.defaultValue
            }

            return result
        }, {})

        const error = Object.keys(values).reduce((result, inputName, i) => {

            result[inputName] = isValidCheck(values[inputName], forms[i].validations)

            return result
        }, {})

        console.log(error)

        errorHandler(error)
        // submitHandler(true)
        // console.log(valid)
        // if (valid) {
        //     const data = Object.keys(e.target.form).reduce((result, el) => {
        //
        //         const element = e.target.form[el]
        //
        //         const id = element.id
        //         if (element.defaultValue) {
        //             result[id] = element.defaultValue
        //             return result
        //         }
        //
        //         return result
        //     }, {})
        //     console.log(e)
            // console.log(data)

    }

    // useEffect(() => {
    //
    // }, [valid])

    return(
        <div className={classes.AuthPage}>

            <div className={classes.authWrapper}>

                <form>

                    <Button type={'orange'} text={'Go back'} typeOfAction={'button'} onClick={e => {
                        e.preventDefault()
                        props.history.push('/')
                    }}/>

                    <Inputs
                        forms={forms}
                        errors={error}
                        class={'white'}
                        // validChange={validChange}
                        // isSubmit={isSubmit}
                        // submitHandler={submitHandler}
                    />
                    <Button
                        onClick={(e) => onSubmitHandler(e)}
                        typeOfAction={'submit'}
                        type={'blueBig'}
                        text={'Sign in'}
                    />

                </form>

                <hr/>
                <Button type={'red'} text={'Forget your password ?'} onClick={e => e.preventDefault()}/>
                <Button type={'green'} text={'Create new account'} />

            </div>
        </div>
    )
}

export default AuthPage