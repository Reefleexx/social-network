import React from 'react'
import classes from './AuthPage.module.scss'
import {Redirect, Route, Switch, withRouter} from "react-router";
import CreateAcc from "../../containers/CreateAcc/CreateAcc";
import SignIn from "../../containers/SignIn/SingIn";
import Alert from "../../components/UI/Alert/Alert";
import {connect} from "react-redux";

const AuthPage = (props) => {
    return(
        <div className={classes.AuthPage}>

            {
                props.error ? <Alert error={props.error}/> : null
            }

            {/*<Alert error={'hi'}/>*/}

            <Switch>
                <Route path={'/authPage/registration'} exact={true} component={CreateAcc}/>
                <Route path={'/authPage/auth'} exact={true} component={SignIn}/>
                <Redirect from={'/authPage'} to={'/authPage/auth'}/>
            </Switch>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.app.error
    }
}

export default withRouter(connect(mapStateToProps)(AuthPage))