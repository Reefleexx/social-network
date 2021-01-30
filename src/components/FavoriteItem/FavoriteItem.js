import React from 'react'
import classes from './FavoriteItem.module.scss'
import photo from '../../img/tall.jpg'
import Button from "../Forms/Button/Button";

const FavoriteItem = (props) => {
    return(
        <div className={classes.FavoriteItem}>
            <div className={classes.row_left}>
                <div className={classes.img_container}>
                    <img src={photo} alt={'Name'}/>
                </div>

                <div className={classes.name_geo}>
                    <span className={classes.name}>Name</span>
                    <span className={classes.geo}>Geolocation: All Over The World</span>
                </div>
            </div>

            <div className={classes.row_right}>
                <Button
                    text={'Open Profile'}
                    type={'gray'}
                    onClick={e => e.preventDefault()}
                />
                <ul>
                    <li><strong>User name: </strong>Vanya__</li>
                    <li><strong>Website: </strong><a href='http://www.google.com/'>www.google.com</a></li>
                </ul>

                <div className={classes.labels}>
                    <div className={classes.label_blue + ' ' + classes.label}>Followers: 0</div>
                    <div className={classes.label_green + ' ' + classes.label}>Following: 0</div>
                    <div className={classes.label_lightBlue + ' ' + classes.label}>Repositories: 0</div>
                    <div className={classes.label_black + ' ' + classes.label}>Gists: 0</div>
                </div>
            </div>

            <i className={classes.icon + " far fa-star"}/>

        </div>
    )
}

export default FavoriteItem