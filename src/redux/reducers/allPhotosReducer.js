import {CLEAR_ALL_PHOTOS_STORE, FETCH_LIKE_PHOTO, SUCCESS_ALL_PHOTOS, SUCCESS_LIKE_PHOTO} from "../types";

const initialState = {
    // id: '',
    // comments: [],
    // comments_count: 0,
    // likes: 0,
    // url: '',
    allPhotos: null
}

export default function allPhotosReducer (state = initialState, action) {
    switch (action.type) {
        case SUCCESS_ALL_PHOTOS: {
            return {
                ...state,
                allPhotos: action.allPhotos
            }
        }
        case SUCCESS_LIKE_PHOTO: {
            return {
                ...state,
                allPhotos: action.allPhotos
            }
        }
        case CLEAR_ALL_PHOTOS_STORE: {
            return {
                ...initialState
            }
        }
        default: return state
    }
}