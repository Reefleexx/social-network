import React, {useState, useEffect, useRef} from 'react'
import classes from './Chat.module.scss'
import photo from "../../../img/wide.jpg";
import {withRouter} from "react-router";


const Chat = (props) => {

    const messageEl = useRef(null);
    const [areaValue, changeArea] = useState('')

    const changeHandler = e => {
        e.preventDefault()
        if (e.target.value.match(/\n/)) {
          onSend(e)
        } else {
            changeArea(e.target.value)
        }

    }

    useEffect(() => {
        messageEl.current.scrollTop = messageEl.current.scrollHeight
    }, [])

    const openUserProfile = e => {
        e.preventDefault()
    }

    const onSend = e => {
        e.preventDefault()
    }

    const goBack = e => {
        e.preventDefault()
        window.history.back()
    }

    return(
        <div className={classes.Chat}>
            <div className={classes.wrapper}>
                <div className={classes.head}>
                    <button className={classes.back_button} onClick={e => goBack(e)}>
                        <i className="fas fa-arrow-left"/>
                        Back
                    </button>

                    <span className={classes.user_name}>
                        Vanya__
                    </span>

                    <div className={classes.imgContainer}>
                        <img src={photo} alt={'alt'} onClick={e => openUserProfile(e)}/>
                    </div>
                </div>

                <div className={classes.body} ref={messageEl}>
                     <div className={classes.your_row}>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Top
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Just message
                             </div>
                         </div>
                         <div className={classes.user_row}>
                             <div className={classes.user_message}>
                                 Just some user message
                             </div>
                         </div>
                         <div className={classes.my_row}>
                             <div className={classes.my_message}>
                                 Bottom
                             </div>
                         </div>
                     </div>
                </div>

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