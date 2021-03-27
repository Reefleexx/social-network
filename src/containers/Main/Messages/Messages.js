import React, {useEffect, useState} from 'react'
import classes from './Messages.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchAllChats} from "../../../redux/actions/chatActions";
import Message from '../../../components/Message/Message'

const Messages = (props) => {

    const dispatch = useDispatch()
    const latestChats = useSelector(state => state.chat.latestChats)
    const currentUid = useSelector(state => state.auth.uid)
    const [type, changeType] = useState('All chats')
    // const chatKeys = Object.keys(chats).reverse()

    useEffect(() => {
        dispatch(fetchAllChats(currentUid))
    }, [])

    useEffect(() => {

    }, [])

    const onChangeType = (e, type) => {
        e.preventDefault()
        changeType(type)
    }

    const renderTypes = (types) => {
        return (
            <div className={classes.messages_types}>
                {types.map((el, i) => (
                    <div
                        className={`${classes.messages_type} ${type === el ? classes.active_type : ''}`}
                        key={i}
                        onClick={e => onChangeType(e, el)}
                    >
                        <span>
                            {el}
                        </span>
                    </div>
                ))}
            </div>
        )
    }
    return(
        <div className={classes.Messages}>
            <div className={classes.messagesWrapper}>
                {
                    latestChats.map(((el, i) => {

                        const monthNames = [
                            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ];

                        const timeStamp = parseInt(el.message.time)

                        const day = new Date(timeStamp).getDate()
                        const month = new Date(timeStamp).getMonth()
                        const year = new Date(timeStamp).getFullYear()

                        if (type === 'All chats') {
                            return (
                                <Message
                                    key={el.user_uid}
                                    uid={el.user_uid}
                                    user_name={el.user_name}
                                    text={el.message.text}
                                    date={`${day} ${monthNames[month]} ${year}`}
                                    checked={el.message.checked}
                                />
                            )
                        }

                        if (type === 'Unread') {
                            return (
                                !el.message.checked &&
                                <Message
                                    key={el.user_uid}
                                    uid={el.user_uid}
                                    user_name={el.user_name}
                                    text={el.message.text}
                                    date={`${day} ${monthNames[month]} ${year}`}
                                    checked={el.message.checked}
                                />
                            )
                        }
                    }))
                }
            </div>

            {renderTypes(['All chats', 'Unread'])}

        </div>
    )
}

export default Messages