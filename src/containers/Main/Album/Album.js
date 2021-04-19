import React, {useEffect} from 'react'
import classes from './Album.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {addPhoto, clearAllPhotosStore, sortAllPhotos} from "../../../redux/actions/allPhotosActions";
import {authentication, database} from "../../../bl/firebaseConfig";
import {withRouter} from "react-router";
import AddPhotoButton from "../../../components/AddPhotoButton/AddPhotoButton";
import PhotoList from "../../../components/PHOTO_SHIT/PhotoList/PhotoList";


const Album = (props) => {

    const allPhotos = useSelector(state => state.allPhotos.allPhotos)
    const dispatch = useDispatch()

    const user_uid = props.match.uid ? props.match.uid : authentication.currentUser.uid

    useEffect(async () => {
        await database.ref(`users/${user_uid}/photos`).on('value', snap => {
            const allPhotos = snap.val()

            if (allPhotos) {
                dispatch(sortAllPhotos(allPhotos))
            }
        })
    }, [])

    useEffect(() => {
        return () => {
            database.ref(`users/${user_uid}/photos`).off()

            dispatch(clearAllPhotosStore())
        }
    }, [])

    const onAddPhoto = photo => {
        dispatch(addPhoto(photo))
    }

    return(
        <div className={classes.Album}>
            <div className={classes.wrapper}>

                <hr/>

                <h2 className={classes.main_headline}>
                    Put all your worries aside and behold your photos
                </h2>

                <hr/>

                <div className={classes.add_photo_button}>
                    <AddPhotoButton
                        onConfirm={onAddPhoto}
                        text={'Add new one'}
                        size={'normal'}
                    />
                </div>

                <PhotoList
                    allPhotos={allPhotos}
                    size={'normal'}
                />

            </div>
        </div>
    )
}

export default withRouter(Album)