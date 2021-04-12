import React, {useState, useEffect, useRef, useCallback} from 'react'
import classes from './Chat.module.scss'
import photo from "../../../img/wide.jpg";
import {withRouter} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchMessages, fetchNewMessage, fetchUpdateMessages, fetchUserData} from "../../../redux/actions/chatActions";
import {database, authentication} from "../../../bl/firebaseConfig";


const Chat = (props) => {

    // TODO add possibility to chat yourself

    const dispatch = useDispatch()

    const chat_data = useSelector(state => state.chat)
    const messages = useSelector(state => state.chat.messages)
    const uid = useSelector(state => state.auth.uid)

    const userUid = props.match.params.uid

    const messageEl = useRef(null);
    const [areaValue, changeArea] = useState('')

    useEffect(() => {
        return () => {
            database.ref(`chats/${chat_data.chatKey}`).off()
            database.ref(`users/${userUid}`).off()
        };
    },[]);

    useEffect( () => {
        messageEl.current.scrollTop = messageEl.current.scrollHeight

        dispatch(fetchUserData(userUid))

        dispatch(fetchMessages(userUid))
    }, [])

    useEffect(async () => {
        if (chat_data.chatKey) {
            const chat = database.ref(`chats/${chat_data.chatKey}`)
            await chat.on('value',  async snapshot => {
                const message = {}
                let key

                chat.orderByKey().limitToLast(1).once('value', snapshot => {
                    key = Object.keys(snapshot.val())[0]

                    message.text = snapshot.val()[key].text
                    message.sender = snapshot.val()[key].sender
                })
                if (key) dispatch(fetchUpdateMessages(key, message))

                if (messageEl.current) messageEl.current.scrollTop = messageEl.current.scrollHeight

                ////////// Set checked \\\\\\\\
                if (authentication.currentUser.uid !== message.sender) {
                    let presence

                    await database.ref(`users/${message.sender}/presence`).once('value', snap => {
                        presence = snap.val()
                    })

                    if (presence === 'online') {
                        await database.ref(`chats/${chat_data.chatKey}/${key}/checked`).set(true)
                    }
                }
            })

        } else {
            await database.ref(`users/${userUid}/chats`).on('value', snapshot => {
                snapshot.forEach(user => {
                    if (user.key === uid) {
                        dispatch(fetchMessages(userUid))
                        database.ref(`users/${userUid}/chats`).off()
                    }
                })
            })
        }
    }, [chat_data.chatKey])

    const changeHandler = e => {
        e.preventDefault()
        if (e.target.value.match(/\n/)) {
          onSend(e)
        } else {
            changeArea(e.target.value)
        }

    }

    ////////// Component handlers \\\\\\\\\\\\
    const openUserProfile = e => {
        e.preventDefault()

        props.history.push(`/search/${userUid}`)
    }

    const onSend = e => {
        e.preventDefault()
        if (areaValue) {
            changeArea('')
            dispatch(fetchNewMessage(areaValue, new Date().getTime(), userUid))
        }
    }

    const goBack = e => {
        e.preventDefault()
        window.history.back()
    }

    const renderMessages = () => {
        if (messages.length < 1) {
            return (
                <div className={classes.body} ref={messageEl}>
                    <div className={classes.emptyChat}>
                        Start chatting with that user...
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.body} ref={messageEl}>
                    {
                        Object.keys(messages).map((timeStamp, i) => {
                            const cls = {
                                row: messages[timeStamp].sender === userUid ? classes.user_row : classes.my_row,
                                message: messages[timeStamp].sender === userUid ? classes.user_message : classes.my_message
                            }

                            return (
                                <div className={cls.row} key={i}>
                                    <div className={cls.message}>
                                        {messages[timeStamp].text}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }

    return(
        <div className={classes.Chat}>
            <div className={classes.wrapper}>
                <div className={classes.head}>
                    <button className={classes.back_button} onClick={e => goBack(e)}>
                        <i className="fas fa-arrow-left"/>
                        Back
                    </button>

                    <span className={classes.user_name} onClick={e => openUserProfile(e)}>
                        {chat_data.user_name}
                    </span>

                    <div className={classes.imgContainer}>
                        <img src={photo} alt={'alt'} onClick={e => openUserProfile(e)}/>
                    </div>
                </div>

                {renderMessages()}

                <div className={classes.foot}>
                    <form
                        action={'submit'}
                        onSubmit={e => onSend(e)}
                        className={classes.foot_form}
                    >
                        <textarea
                            value={areaValue}
                            name={'message_text'}
                            onChange={e => changeHandler(e)}
                            cols="30"
                            rows={'auto'}
                            className={classes.foot_text}
                              placeholder={'Write something...'}
                        />
                        <i id={classes.send_icon} className="fas fa-paper-plane" onClick={e => onSend(e)}/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Chat)