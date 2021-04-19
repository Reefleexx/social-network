import React from 'react'
import classes from './PhotoList.module.scss'
import {authentication} from "../../../bl/firebaseConfig";
import PhotoItem from "../PhotoItem/PhotoItem";
import {fetchLikePhoto} from "../../../redux/actions/allPhotosActions";
import {openDrawer} from "../../../redux/actions/appActions";
import Photo from "../Photo/Photo";
import {useDispatch} from "react-redux";

const PhotoList = (props) => {

    const dispatch = useDispatch()

    const onLikeHandler = (e, photoKey, isLiked, user_uid) => {
        e.preventDefault()
        e.stopPropagation()

        dispatch(fetchLikePhoto(photoKey, user_uid, isLiked))
    }

    const onCommentHandler = (e, photoKey, user_uid, src) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(openDrawer(() => <Photo
            photoKey={photoKey}
            user_uid={user_uid}
            src={src}
            focusTextarea={true}
        />))
    }

    const onOpenImg = (e, photoKey, user_uid, src) => {
        e.preventDefault()

        dispatch(openDrawer(() => <Photo photoKey={photoKey} user_uid={user_uid} src={src}/>))
    }

    return(
        <div className={classes.PhotoList}>
            {
                props.allPhotos && Object.keys(props.allPhotos).length > 0 ?
                    Object.keys(props.allPhotos).map(photoKey => {

                        let isLiked = false

                        if (props.allPhotos[photoKey].likes) {
                            if (props.allPhotos[photoKey].likes.find(el => el === authentication.currentUser.uid)){
                                isLiked = true
                            }
                        }

                        return (
                            <PhotoItem
                                key={photoKey}
                                isLiked={isLiked}
                                onOpenImg={onOpenImg}
                                onLikeHandler={onLikeHandler}
                                photoKey={photoKey}
                                photo={props.allPhotos[photoKey]}
                                onCommentHandler={onCommentHandler}
                                size={props.size}
                            />
                        )
                    }) : <h3 className={classes.noPhotos_headline}>No photos yet</h3>
            }
        </div>
    )
}

export default PhotoList