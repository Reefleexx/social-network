import React, {useRef} from 'react'
import classes from './Album.module.scss'
import photo from '../../../img/tall.jpg'
import photo1 from '../../../img/wide.jpg'
import {useDispatch} from "react-redux";
import {addPhoto} from "../../../redux/actions/photoActions";


const Album = (props) => {

    const dispatch = useDispatch()
    const inputRef = useRef()

    const onLikeHandler = e => {
        e.preventDefault()
        e.stopPropagation()

        console.log('Like')
    }

    const onCommentHandler = e => {
        e.preventDefault()
        e.stopPropagation()

        console.log('Comment')
    }

    const onOpenImg = e => {
        e.preventDefault()
        console.log('Open')
    }

    const onAddImg = e => {
        e.preventDefault()
        inputRef.current.click()
        // dispatch(addPhoto(e.target.files[0]))
    }

    const previewImgHandler = e => {
        e.preventDefault()
        console.log(e.target.files[0])
        // dispatch(addPhoto(e.target.files[0]))
    }

    return(
        <div className={classes.Album}>
            <div className={classes.wrapper}>

                <hr/>

                <h2 className={classes.main_headline}>
                    Put all your worries aside and behold your photos
                </h2>

                <hr/>

                <button className={classes.add_button} onClick={e => onAddImg(e)}>
                    Add new one
                </button>

                <input
                    type="file"
                    ref={inputRef}
                    onChange={e => previewImgHandler(e)}
                    accept={'image/*'}
                    style={{display: 'none'}}
                />

                <div className={classes.photos_container}>

                    <div className={classes.img_container} onClick={e => onOpenImg(e)}>
                        <div className={classes.task_bar}>
                            <i
                                className={`far fa-heart`}
                                onClick={e => onLikeHandler(e)}
                            />
                            <i
                                className={`far fa-comment-dots`}
                                onClick={e => onCommentHandler(e)}
                            />
                        </div>
                        <img src={photo} alt=""/>
                    </div>


                    <div className={classes.img_container}>
                        <img src={photo} alt=""/>
                    </div>
                    <div className={classes.img_container}>
                        <img src={photo} alt=""/>
                    </div>

                    <div className={classes.img_container}>
                        <img src={photo1} alt=""/>
                    </div>
                    <div className={classes.img_container}>
                        <img src={photo} alt=""/>
                    </div>
                    <div className={classes.img_container}>
                        <img src={photo} alt=""/>
                    </div>

                    <div className={classes.img_container}>
                        <img src={photo} alt=""/>
                    </div>
                    <div className={classes.img_container}>
                        <img src={photo1} alt=""/>
                    </div>
                    <div className={classes.img_container}>
                        <img src={photo1} alt=""/>
                    </div>

                    <div className={classes.img_container}>
                        <img src={photo1} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Album