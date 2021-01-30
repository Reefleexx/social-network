import React, {useState} from 'react'
import classes from './AuthPage.module.scss'
import Button from "../../components/Forms/Button/Button";
import {getValues, isValidCheck} from "../../bl/formLogic/formLogic";
import {withRouter} from "react-router";
import Input from "../../components/Forms/Input/Input";


const AuthPage = (props) => {

    const [isError, isErrorHandler] = useState(false)

    const onSubmitHandler = e => {

        e.preventDefault()

        isErrorHandler(true)

        console.log(e)

        const values = getValues(e)

        const errors = Object.keys(values).reduce((result, inputName, i) => {

            result[inputName] = isValidCheck(values[inputName], e.target.form[i].validations)

            return result
        }, {})
        console.log(errors)
        console.log(values)

    }
    const onCreateAcc = e => {
        e.preventDefault()
        props.history.push('/authPage/registration')

    }

    return(
        <div className={classes.AuthPage}>

            <div className={classes.authWrapper}>

                <form>

                    <Button type={'orange'} text={'Go back'} typeOfAction={'button'} onClick={e => {
                        e.preventDefault()
                        props.history.push('/')
                    }}/>

                    <Input
                        type={'email'}
                        error={isError}
                        class={'text_2'}
                        errorToggler={isErrorHandler}
                    />

                    <Input
                        type={'password'}
                        class={'text_2'}
                        error={isError}
                        errorToggler={isErrorHandler}
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
                <Button type={'green'} text={'Create new account'} onClick={e => onCreateAcc(e)}/>

            </div>
        </div>
    )
}

export default withRouter(AuthPage)