import React from 'react'
import classes from './Messages.module.scss'
import Message from "../../../components/Message/Message";

const Messages = (props) => {

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

    return(
        <div className={classes.Messages}>
            <div className={classes.messagesWrapper}>
                <Message/>
                <Message/>
            </div>

            {renderTypes(['All chats', 'Unread'])}

        </div>
    )
}

export default Messages