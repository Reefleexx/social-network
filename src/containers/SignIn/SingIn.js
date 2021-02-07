import React, {useState} from 'react'
import classes from "./SignIn.module.scss";
import Button from "../../components/Forms/Button/Button";
import Input from "../../components/Forms/Input/Input";
import {connect} from "react-redux";
import {hideAlert} from "../../redux/actions/appActions";
import {fetchSignIn} from "../../redux/actions/authActions";

const SignIn = (props) => {

    const [values, changeValues] = useState({
        password: '',
        about: ''
    })
    const [isError, isErrorHandler] = useState(false)
    const [isValid, validChange] = useState({
        email: false,
        password: false
    })

    const onSubmitHandler = e => {

        e.preventDefault()
        isErrorHandler(true)

        const isAllValid = Object.keys(isValid).reduce((result, el) => {
            return result && isValid[el]
        }, true)

        if (isAllValid) {
            props.fetchSignIn(values)
        }

    }

    const onCreateAcc = e => {
        e.preventDefault()
        props.hideAlert()
        props.history.push('/authPage/registration')
    }

    return(
        <div className={classes.authWrapper}>

            <form>

                <Button type={'orange'} text={'Go back'} typeOfAction={'button'} onClick={e => {
                    e.preventDefault()
                    props.hideAlert()
                    props.history.push('/')
                }}/>

                <Input
                    type={'email'}
                    error={isError}
                    class={'text_2'}
                    errorToggler={isErrorHandler}
                    onChange={changeValues}
                    validChange={validChange}
                />

                <Input
                    type={'password'}
                    class={'text_2'}
                    error={isError}
                    errorToggler={isErrorHandler}
                    onChange={changeValues}
                    validChange={validChange}
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
    )
}

const mapDispatchToProps = dispatch => {
    return {
        hideAlert: () => dispatch(hideAlert()),
        fetchSignIn: data => dispatch(fetchSignIn(data))
    }
}

export default connect(null, mapDispatchToProps)(SignIn)