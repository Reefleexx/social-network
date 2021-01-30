import React, {useState} from 'react'
import classes from './CreateAcc.module.scss'
import Button from "../../components/Forms/Button/Button";
import {getValues} from "../../bl/formLogic/formLogic";
import Input from "../../components/Forms/Input/Input";
import {withRouter} from "react-router";
import Calendar from "../../components/Forms/Select/Calendar";


const CreateAcc = (props) => {

    const [isError, isErrorHandler] = useState(false)

    const onSubmit = e => {
        e.preventDefault()
        isErrorHandler(true)
        console.log(e)
        console.log(getValues(e))
    }

    const onSignIn = e => {
        e.preventDefault()
        props.history.push('/authPage')
    }

    return(
        <div className={classes.CreateAcc}>
            <div className={classes.wrapper}>
                <Button type={'orange'} text={'Go back'} typeOfAction={'button'} onClick={e => {
                    e.preventDefault()
                    props.history.push('/')
                }}/>

                <div className={classes.input_field}>

                    <form action={'submit'} onSubmit={e => onSubmit(e)}>
                        <Input
                            type={'user_name'}
                            errorToggler={isErrorHandler}
                            error={isError}
                        />

                        <Input
                            type={'name'}
                            errorToggler={isErrorHandler}
                            error={isError}
                        />

                        <Input
                            type={'surname'}
                            errorToggler={isErrorHandler}
                            error={isError}
                        />

                        <span className={classes.date}>
                            Date of birthday
                        </span>

                        <Calendar/>

                        <Input
                            type={'about'}
                            errorToggler={isErrorHandler}
                            error={isError}
                        />

                        <Input
                            type={'email'}
                            errorToggler={isErrorHandler}
                            error={isError}
                        />

                        <Input
                            type={'password'}
                            errorToggler={isErrorHandler}
                            error={isError}
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