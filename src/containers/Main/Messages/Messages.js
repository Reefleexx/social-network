import React, {useEffect} from 'react'
import classes from './Messages.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {fetchAllChats} from "../../../redux/actions/chatActions";
import Message from '../../../components/Message/Message'

const Messages = (props) => {

    const dispatch = useDispatch()
    const latestChats = useSelector(state => state.chat.latestChats)
    const currentUid = useSelector(state => state.auth.uid)
    // const chatKeys = Object.keys(chats).reverse()

    useEffect(() => {
        dispatch(fetchAllChats(currentUid))
    }, [])

    const renderTypes = (types) => {
        return (
            <div className={classes.messages_types}>
                {types.map((el, i) => (
                    <div className={classes.messages_type} key={i}>
                        <span>
                            {el}
                        </span>
                    </div>
                ))}
            </div>
        )
    }
    console.log();
    return(
        <div className={classes.Messages}>
            <div className={classes.messagesWrapper}>
                {
                    latestChats.map((chatKey => {
                        const el = latestChats[chatKey]
                        console.log('hi')
                        return (
                            <Message
                                key={chatKey}
                                uid={el.user_uid}
                                user_name={el.user_name}
                                text={el.message.text}
                                date={}
                            />
                        )
                    }))
                }
            </div>

            {renderTypes(['All chats', 'Unread'])}

        </div>
    )
}

export default Messages