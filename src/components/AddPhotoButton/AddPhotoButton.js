import React, {useRef} from 'react'
import classes from './AddPhotoButton.module.scss'
import {openDrawer} from "../../redux/actions/appActions";
import PreviewPhoto from "../PHOTO_SHIT/PreviewPhoto/PreviewPhoto";
import {useDispatch} from "react-redux";

const AddPhotoButton = (props) => {

    const dispatch = useDispatch()

    const inputRef = useRef()

    const onButtonClick = e => {
        e.preventDefault()

        inputRef.current.click()
    }

    const onInputChange = e => {
        e.preventDefault()

        const photo = inputRef.current.files[0]

        dispatch(openDrawer(() => <PreviewPhoto
            photo={photo}
            text={'Add your photo'}
            inputRef={inputRef}
            onConfirm={props.onConfirm}
        />))

        inputRef.current.value = ''

    }

    const cls = [
        props.class === 'default' ?
            classes.add_def_button : classes.add_button,
        classes[`size_${props.size}`]
    ]

    return(
        <>
            <button
                className={cls.join(' ')}
                onClick={e => onButtonClick(e)}
            >
                {props.text}
            </button>

            <input
                type="file"
                ref={inputRef}
                onChange={e => onInputChange(e)}
                accept={'image/*'}
                style={{display: 'none'}}
            />
        </>
    )
}

export default AddPhotoButton