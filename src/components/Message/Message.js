import React from 'react'
import classes from './Message.module.scss'
import photo from '../../img/tall.jpg'
import {withRouter} from "react-router";
import {useDispatch} from "react-redux";
import {deleteChat} from "../../redux/actions/chatActions";
import {openDrawer, showWarningWin} from "../../redux/actions/appActions";
import WarningWin from "../../containers/warningWin/warningWin";

const Message = (props) => {

    const dispatch = useDispatch()

    const onOpenChat = (e) => {
        e.preventDefault()
        if (e.target.className === classes.message_name || e.target.localName === 'img') {
            props.history.push(`/search/${props.uid}`)
        } else if (e.target.className === 'fas fa-times') {
            // dispatch(showWarningWin(
            //     'This chat will be delete from both users',
            //     () => dispatch(deleteChat(props.uid)))
            // )
            dispatch(openDrawer(() => <WarningWin
                text={'This chat will be irrevocably delete from both users'}
                callBack={() => dispatch(deleteChat(props.uid))}
            />))
        } else {
            props.history.push(`/${props.uid}/chat`)
        }
    }

    return(
        <div className={classes.message_container} onClick={e => onOpenChat(e)}>
            <div className={classes.img_container}>
                <img src={photo} alt={'User photo'}/>
            </div>

            <div className={classes.message_text}>
                <span className={classes.message_name}>{props.user_name}</span>
                <span className={classes.message_last_text + ' ' + (!props.checked ? classes.unChecked : '') }>
                    {props.text}
                </span>
            </div>

            <div className={classes.message_data}>
                <span className={classes.message_date}>{props.date}</span>
                {/*<div className={classes.message_count}>*/}
                {/*    {props.date}*/}
                {/*</div>*/}
            </div>

            <i className="fas fa-times"/>

        </div>
    )
}

export default withRouter(Message)