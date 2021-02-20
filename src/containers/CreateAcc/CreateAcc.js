import React, {useState, useEffect} from 'react'
import classes from './CreateAcc.module.scss'
import Button from "../../components/Forms/Button/Button";
import Input from "../../components/Forms/Input/Input";
import {withRouter} from "react-router";
import Calendar from "../../components/Forms/Select/Calendar";
import {useDispatch} from "react-redux";
import {fetchSignUp} from "../../redux/actions/authActions";
import {hideAlert} from "../../redux/actions/appActions";
import Country from "../../components/Forms/Select/Country";
import TextArea from "../../components/Forms/TextArea/TextArea";
import Sex from "../../components/Forms/Select/Sex";


const CreateAcc = (props) => {

    const dispatch = useDispatch()

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
        about: true,
        email: false,
        password: false
    })
    const [dateValues, changeDate] = useState({
        day: 1,
        month: 1,
        year: new Date().getFullYear()
    })
    const [location, changeLocation] = useState({
        country: 'Ukraine',
        region: 'Khmelnytskyi'
    })
    const [sex, changeSex] = useState('')

    const calendarHandler = (e, type) => {
        e.preventDefault()
        changeDate(prev => {
            return {
                ...prev,
                [type]: parseInt(e.target.value)
            }
        })
    }

    const countryHandler = (val, type) => {
        changeLocation(state => {
            return {
                ...state,
                [type]: val
            }
        })
    }

    const sexHandler = (e) => {
        e.preventDefault()
        changeSex(e.target.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        isErrorHandler(true)

        const isAllValid = Object.keys(isValid).reduce((result, el) => {
            return result && isValid[el]
        }, true)

        if (isAllValid && sex) {
            dispatch(fetchSignUp({
                ...values,
                dateOfBirth: {...dateValues},
                sex: sex,
                location: {...location}
            }))
        }
    }

    const onSignIn = e => {
        e.preventDefault()
        dispatch(hideAlert())
        props.history.push('/authPage/auth')
    }

    return(
        <div className={classes.CreateAcc}>
            <div className={classes.wrapper}>
                <Button type={'orange'} text={'Go back'} typeOfAction={'button'} onClick={e => {
                    e.preventDefault()
                    dispatch(hideAlert())
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
                            Sex
                        </span>

                        <Sex
                            onChange={sexHandler}
                            error={!sex && isError ? 'Please choose your sex' : null}
                        />

                        <span className={classes.date}>
                            Date of birthday
                        </span>

                        <Calendar
                            onChange={calendarHandler}
                        />

                        <span className={classes.date}>
                            Chose your location
                        </span>

                        <Country
                            onChange={countryHandler}
                            values={location}
                        />

                        {/*<Input*/}
                        {/*    type={'about'}*/}
                        {/*    errorToggler={isErrorHandler}*/}
                        {/*    error={isError}*/}
                        {/*    onChange={changeValues}*/}
                        {/*    validChange={validChange}*/}
                        {/*/>*/}

                        <TextArea
                            onChange={changeValues}
                            label={'About'}
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


export default withRouter(CreateAcc)