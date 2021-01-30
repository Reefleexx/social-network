import React from 'react'
import classes from './Message.module.scss'
import photo from '../../img/tall.jpg'

const Message = (props) => {
    return(
        <div className={classes.message_container}>
            <div className={classes.img_container}>
                <img src={photo} alt={'User photo'}/>
            </div>

            <div className={classes.message_text}>
                <span className={classes.message_name}>Dzemich Ivan</span>
                <span className={classes.message_last_text}>Some text</span>
            </div>

            <div className={classes.message_data}>
                <span className={classes.message_date}>Date</span>
                <div className={classes.message_count}>
                    12
                </div>
            </div>

            <i className="fas fa-times"/>

        </div>
    )
}

export default Message