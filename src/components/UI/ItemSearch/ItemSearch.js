import React from 'react'
import classes from './ItemSearch.module.scss'
import Button from "../../Forms/Button/Button";
import {withRouter} from "react-router";
import photo from '../../../img/tall.jpg'

const ItemSearch = (props) => {

    const onClickHandler = e => {
        e.preventDefault()
        console.log(props.uid)
        props.history.push(`/search/${props.uid}`)
    }

    return(
        <div className={classes.ItemSearch} key={props.i}>
            <div className={classes.img_container}>
                <img src={photo} alt={'photo'}/>
            </div>

            <span className={classes.name}>
                {props.user_name}
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