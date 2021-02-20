import React from 'react'
import {connect} from "react-redux";
import classes from './Alert.module.scss'
import {hideAlert} from "../../../redux/actions/appActions";

const Alert = (props) => {

    const onClick = e => {
        e.preventDefault()
        props.hideAlert()
    }

    return(
        <div className={classes.Alert} role={'alert'}>
            {props.error}
            <i className={'fas fa-times'} onClick={e => onClick(e)}/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.app.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideAlert: () => dispatch(hideAlert())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)