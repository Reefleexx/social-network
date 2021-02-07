import React from 'react'
import classes from './Auth.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {openWarningWin} from "../../../redux/actions/appActions";
import {withRouter} from "react-router";

const Auth = (props) => {

    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const onClick = e => {
        e.preventDefault()
        if (user.uid) {
            dispatch(openWarningWin('Are you sure you want to sign out ?'))
        } else {
            props.history.push('/authPage/auth')
        }
    }

    return(
        <div className={'col-2 ' + classes.Auth}>
            <div
                onClick={e => onClick(e)}
                className={classes.linkText}
            >
                {
                    user.uid ? 'Sign Out' : 'Sign in'
                }
                {
                    user.uid ? <i className="ml-2 fas fa-sign-in-alt"/> :
                        <i className="ml-2 fas fa-sign-out-alt"/>
                }
            </div>
        </div>
    )
}

export default withRouter(Auth)