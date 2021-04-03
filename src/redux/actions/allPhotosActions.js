import {ADD_PHOTO, FETCH_LIKE_PHOTO, SUCCESS_ALL_PHOTOS} from "../types";

export const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        photo
    }
}

export const sortAllPhotos = allPhotos => {
    return dispatch => {
        let newAllPhotos = allPhotos

        Object.keys(allPhotos).forEach(photoKey => {
            if (allPhotos[photoKey].likes) {
                const likes = Object.keys(allPhotos[photoKey].likes).map(likeKey => {
                    return allPhotos[photoKey].likes[likeKey]
                })

                newAllPhotos[photoKey] = {
                    ...allPhotos[photoKey],
                    likes: likes
                }
            }
        })

        dispatch(successAllPhotos(newAllPhotos))
    }
}

export const successAllPhotos = (allPhotos) => {
    return {
        type: SUCCESS_ALL_PHOTOS,
        allPhotos
    }
}

export const fetchLikePhoto = (photoKey, user_uid, isLiked) => {
    return {
        type: FETCH_LIKE_PHOTO,
        photoKey, user_uid, isLiked
    }
}