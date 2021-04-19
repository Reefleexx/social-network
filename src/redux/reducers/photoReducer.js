import {CLEAR_PHOTO_STORE, SUCCESS_ALL_COMMENTS} from "../types";

const initialState = {
    photoKey: '',
    user_uid: '',
    src: '',
    timeStamp: '',
    likes: [],
    comments: {}
}

export default function photoReducer (state = initialState, action) {
    switch(action.type) {
        case SUCCESS_ALL_COMMENTS: {
            return {
                ...state,
                comments: action.allComments
            }
        }
        case CLEAR_PHOTO_STORE: {
            return {
                initialState
            }
        }
        default: return state
    }
}