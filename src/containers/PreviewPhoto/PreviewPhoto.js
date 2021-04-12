import React, {useRef} from 'react'
import classes from './PreviewPhoto.module.scss'
import {preventPropagation} from "../../bl/functions";
import {useDispatch} from "react-redux";
import {closeDrawer} from "../../redux/actions/appActions";
import {addPhoto} from "../../redux/actions/allPhotosActions";

const PreviewPhoto = (props) => {

    const dispatch = useDispatch()

    const photoUrl = URL.createObjectURL(props.photo)

    const onCancel = e => {
        e.preventDefault()
        dispatch(closeDrawer())
    }

    const onAnother = e => {
        e.preventDefault()
        props.inputRef.current.click()
    }

    const onConfirm = e => {
        e.preventDefault()
        dispatch(closeDrawer())

        ////// Add photo \\\\\\
        dispatch(addPhoto(props.photo))
    }

    return(
        <div className={classes.PreviewPhoto} onClick={e => preventPropagation(e)}>
            <div className={classes.wrapper}>

                <i className={'fas fa-times'} onClick={e => onCancel(e)}/>

                <h1 className={classes.headline}>{props.text}</h1>
                <div className={classes.photo_container}>
                    <img src={photoUrl} alt={'Here could be your photo'}/>
                </div>

                <div className={classes.btn_container}>
                    <button className={classes.button} onClick={e => onAnother(e)}>
                        Another
                    </button>

                    <button className={classes.button} onClick={e => onConfirm(e)}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PreviewPhoto