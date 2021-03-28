import React from 'react'
import classes from './Album.module.scss'
import photo from '../../img/tall.jpg'
import photo1 from '../../img/wide.jpg'


const Album = (props) => {
    return(
        <div className={classes.Album}>
            <div className={classes.wrapper}>
                <h2 className={classes.main_headline}>
                    Put all your worries aside and see your photos
                </h2>
                <div className={classes.photo_container}>
                    <img src={photo} alt="" className={classes.photo}/>
                    <img src={photo} alt="" className={classes.photo}/>
                    <img src={photo1} alt="" className={classes.photo}/>

                    <img src={photo} alt="" className={classes.photo}/>
                    <img src={photo} alt="" className={classes.photo}/>
                    <img src={photo} alt=""/>

                    <img src={photo1} alt="" className={classes.photo}/>
                    <img src={photo1} alt="" className={classes.photo}/>
                    <img src={photo1} alt="" className={classes.photo}/>

                    <img src={photo1} alt="" className={classes.photo}/>
                </div>
            </div>
        </div>
    )
}

export default Album