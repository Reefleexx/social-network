import React from 'react'
import classes from './IconProfile.module.scss'
import {withRouter} from "react-router";

const IconProfile = (props) => {
    const onClickHandler = e => {
        e.preventDefault()
        props.history.push(`/search/${props.uid}`)
    }

    const cls = [
        classes.ProfileIcon,
        props.type === 'all' ? classes[props.type] : ''
    ]

    return(
        <div className={cls.join(' ')}>
            <div className={classes.imgContainer}>
                <img src={props.photo} alt={props.name} onClick={e => onClickHandler(e)}/>
            </div>
            <span className={classes.userName} onClick={e => onClickHandler(e)}>{props.name}</span>
        </div>
    )
}

export default withRouter(IconProfile)