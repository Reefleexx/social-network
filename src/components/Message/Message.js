import React from 'react'
import classes from './Message.module.scss'
import photo from '../../img/tall.jpg'
import {withRouter} from "react-router";

const Message = (props) => {

    const onOpenChat = (e) => {
        e.preventDefault()
        props.history.push(`/${props.uid}/chat`)
    }

    const onOpenUser = (e) => {
        e.preventDefault()
        props.history.push(`/search${props.uid}`)
    }

    const onDeleteChat = (e, uid) => {
        e.preventDefault()
    }
    return(
        <div className={classes.message_container} onClick={e => onOpenChat(e)}>
            <div className={classes.img_container}>
                <img src={photo} alt={'User photo'}/>
            </div>

            <div className={classes.message_text}>
                <span className={classes.message_name} onClick={e => onOpenUser(e)}>{props.user_name}</span>
                <span className={classes.message_last_text}>{props.text}</span>
            </div>

            <div className={classes.message_data}>
                <span className={classes.message_date}>Date</span>
                <div className={classes.message_count}>
                    {props.date}
                </div>
            </div>

            <i className="fas fa-times" onClick={e => onDeleteChat(e)}/>

        </div>
    )
}

export default withRouter(Message)