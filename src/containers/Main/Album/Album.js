import React, {useRef, useEffect} from 'react'
import classes from './Album.module.scss'
import photo from '../../../img/tall.jpg'
import photo1 from '../../../img/wide.jpg'
import {useDispatch, useSelector} from "react-redux";
import {fetchLikePhoto, loadAllPhotos, sortAllPhotos} from "../../../redux/actions/allPhotosActions";
import {openDrawer} from "../../../redux/actions/appActions";
import PreviewPhoto from "../../PreviewPhoto/PreviewPhoto";
import {authentication, database} from "../../../bl/firebaseConfig";
import {withRouter} from "react-router";


const Album = (props) => {

    const allPhotos = useSelector(state => state.allPhotos.allPhotos)
    const dispatch = useDispatch()

    const inputRef = useRef()

    useEffect(async () => {
        await database.ref(`users/${user_uid}/photos`).on('value', snap => {
            const allPhotos = snap.val()

            dispatch(sortAllPhotos(allPhotos))
        })

        return async function () {
            await database.ref(`users/${user_uid}/photos`).off()
        }
    }, [])

    const user_uid = props.match.uid ? props.match.uid : authentication.currentUser.uid

    const onLikeHandler = (e, photoKey) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(fetchLikePhoto(photoKey, user_uid, isLiked))
    }

    const onCommentHandler = e => {
        e.preventDefault()
        e.stopPropagation()

    }

    const onOpenImg = e => {
        e.preventDefault()
    }

    const onAddImg = e => {
        e.preventDefault()
        inputRef.current.click()
    }

    const previewImgHandler = e => {
        e.preventDefault()
        const photo = inputRef.current.files[0]

        dispatch(openDrawer(() => <PreviewPhoto
            photo={photo}
            text={'Add your photo'}
            inputRef={inputRef}
        />))

        inputRef.current.value = ''
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

                    {
                        allPhotos && Object.keys(allPhotos).length > 0 ?
                            Object.keys(allPhotos).map(photoKey => {

                                let isLiked = false

                                if (allPhotos[photoKey].likes) {
                                    console.log(allPhotos[photoKey])
                                    if (allPhotos[photoKey].likes.find(el => el === authentication.currentUser.uid)){
                                        isLiked = true
                                    }
                                }

                                return (
                                    <div
                                        className={classes.img_container}
                                        onClick={e => onOpenImg(e, allPhotos[photoKey])}
                                        key={photoKey}
                                    >
                                        <div className={classes.task_bar}>
                                            <i
                                                className={`${isLiked ? 'fas': 'far'} fa-heart`}
                                                onClick={e => onLikeHandler(e, photoKey, isLiked)}
                                            />
                                            <i
                                                className={`far fa-comment-dots`}
                                                onClick={e => onCommentHandler(e)}
                                            />
                                        </div>
                                        <img src={allPhotos[photoKey].src} alt=""/>
                                    </div>

                                )
                            }) : <h3>No photos yet</h3>
                    }

                </div>
            </div>
        </div>
    )
}

export default withRouter(Album)