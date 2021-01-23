import React from 'react'
import classes from './IconProfile.module.scss'

const IconProfile = ({name, photo}) => {
    return(
        <div className={classes.ProfileIcon}>
            <div className={classes.imgContainer}>
                <img src={photo} alt="#"/>
            </div>
            <span className={classes.userName}>{name}</span>
        </div>
    )
}

export default IconProfile