import React from 'react'
import classes from './Message.module.scss'
import {withRouter} from "react-router";
import {useDispatch} from "react-redux";
import {deleteChat} from "../../redux/actions/chatActions";
import {openDrawer} from "../../redux/actions/appActions";
import WarningWin from "../../containers/warningWin/warningWin";
import {authentication} from "../../bl/firebaseConfig";

const Message = (props) => {

    const dispatch = useDispatch()

    const onOpenChat = (e) => {
        e.preventDefault()
        if (e.target.className === classes.message_name || e.target.localName === 'img') {
            props.history.push(`/search/${props.uid}`)
        } else if (e.target.className === 'fas fa-times') {

            dispatch(openDrawer(() => <WarningWin
                text={'This chat will be irrevocably delete from both users'}
                callBack={() => dispatch(deleteChat(props.uid))}
            />))

        } else {
            props.history.push(`/${props.uid}/chat`)
        }
    }

    const renderText = () => {
        if (props.text.length > 30) {
            const words = props.text.split(' ')

            if (words.length > 1) {
                if (words[0] < 30) {
                    const firstWords = words.reduce((result, word) => {
                        if (result.length + word.length < 30) {
                            const all = result ? result + ' ' + word : word
                            return all
                        }
                        return result
                    }, '')

                    return firstWords + '...'
                }
                return `${props.text.slice(0, 30)}...`
            } else {
                console.log(words)
                return `${props.text.slice(0, 30)}...`
            }
        } else {
            return props.text
        }
    }

    return(
        <div className={classes.message_container} onClick={e => onOpenChat(e)}>
            <div className={classes.img_container}>
                <img src={props.photo} alt={'User photo'}/>
            </div>

            <div className={classes.message_text}>
                <span className={classes.message_name}>{props.user_name}</span>
                <span className={classes.message_last_text + ' ' + (!props.checked ? classes.unChecked : '') }>
                    {
                        authentication.currentUser.uid === props.sender_uid ?
                            `You: ${renderText()}` :
                            `${props.user_name}: ${renderText()}`
                    }
                </span>
            </div>

            <div className={classes.message_data}>
                <span className={classes.message_date}>{props.date}</span>
            </div>

            <i className="fas fa-times"/>

        </div>
    )
}

export default withRouter(Message)