import React from 'react'
import classes from './ItemSearch.module.scss'
import Button from "../../Forms/Button/Button";
import {withRouter} from "react-router";
import photo from '../../../img/tall.jpg'

const ItemSearch = (props) => {

    const onClickHandler = e => {
        e.preventDefault()
        props.history.push(`/search/ ${props.link}`)
    }

    return(
        <div className={classes.ItemSearch}>
            <div className={classes.img_container}>
                <img src={photo} alt={'photo'}/>
            </div>

            <span className={classes.name}>
                User name
            </span>

            <Button
                type={'blue'}
                text={'Open'}
                onClick={e => onClickHandler(e)}
                size={'0'}
            />

            <i className="far fa-star"/>
        </div>
    )
}

export default withRouter(ItemSearch)