import React from 'react'
import classes from './Auth.module.scss'
import {NavLink} from "react-router-dom";

const Auth = (props) => {
    return(
        <div className={'col-2 ' + classes.Auth}>
            <NavLink to={'/authPage'} exact={true} className={classes.linkText}>
                Sign In
                <i className="ml-2 fas fa-sign-in-alt"/>
            </NavLink>
        </div>
    )
}

export default Auth