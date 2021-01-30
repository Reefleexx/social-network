import React from 'react'
import classes from './Favorites.module.scss'
import FavoriteItem from "../../../components/FavoriteItem/FavoriteItem";

const Favorites = (props) => {
    return(
        <div className={classes.Favorites}>
            <FavoriteItem/>
            <FavoriteItem/>
        </div>
    )
}

export default Favorites