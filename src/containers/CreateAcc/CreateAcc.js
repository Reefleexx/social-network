import React, {useState} from 'react'
import classes from './CreateAcc.module.scss'
import Button from "../../components/Forms/Button/Button";
import Input from "../../components/Forms/Input/Input";
import {withRouter} from "react-router";
import Calendar from "../../components/Forms/Select/Calendar";
import {connect} from "react-redux";
import {fetchSignUp} from "../../redux/actions/authActions";
import {hideAlert} from "../../redux/actions/appActions";


const CreateAcc = (props) => {

    const [values, changeValues] = useState({
        user_name: '',
        surname: '',
        name: '',
        email: '',
        password: '',
        about: ''
    })
    const [isError, isErrorHandler] = useState(false)
    const [isValid, validChange] = useState({
        user_name: false,
        surname: false,
        name: false,
        about: false,
        email: false,
        password: false
    })

    const onSubmit = e => {
        e.preventDefault()
        isErrorHandler(true)

        const isAllValid = Object.keys(isValid).reduce((result, el) => {
            return result && isValid[el]
        }, true)

        if (isAllValid) {
            props.fetchUserData(values)
        }
    }

    const onSignIn = e => {
        e.preventDefault()
        props.hideAlert()
        props.history.push('/authPage/auth')
    }

    return(
        <div className={classes.CreateAcc}>
            <div className={classes.wrapper}>
                <Button type={'orange'} text={'Go back'} typeOfAction={'button'} onClick={e => {
                    e.preventDefault()
                    props.hideAlert()
                    props.history.push('/')
                }}/>

                <div className={classes.input_field}>

                    <form action={'submit'} onSubmit={e => onSubmit(e)}>
                        <Input
                            type={'user_name'}
                            errorToggler={isErrorHandler}
                            error={isError}
                            onChange={changeValues}
                            validChange={validChange}
                            // e => onChange(e, 'user_name'
                        />

                        <Input
                            type={'name'}
                            error={isError}
                            errorToggler={isErrorHandler}
                            onChange={changeValues}
                            validChange={validChange}
                        />

                        <Input
                            type={'surname'}
                            errorToggler={isErrorHandler}
                            error={isError}
                            onChange={changeValues}
                            validChange={validChange}
                        />

                        <span className={classes.date}>
                            Date of birthday
                        </span>

                        <Calendar/>

                        <Input
                            type={'about'}
                            errorToggler={isErrorHandler}
                            error={isError}
                            onChange={changeValues}
                            validChange={validChange}
                        />

                        <Input
                            type={'email'}
                            errorToggler={isErrorHandler}
                            error={isError}
                            onChange={changeValues}
                            validChange={validChange}
                        />

                        <Input
                            type={'password'}
                            errorToggler={isErrorHandler}
                            error={isError}
                            onChange={changeValues}
                            validChange={validChange}
                        />

                        <Button
                            type={'green'}
                            typeOfAction={'submit'}
                            text={'Create account'}
                            onClick={e => onSubmit(e)}
                        />

                        <Button
                            type={'blue'}
                            text={'Sign in'}
                            onClick={e => onSignIn(e)}
                        />
                    </form>

                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserData: data => dispatch(fetchSignUp(data)),
        hideAlert: () => dispatch(hideAlert())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CreateAcc))