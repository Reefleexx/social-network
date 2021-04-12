import {SUCCESS_ALL_COMMENTS} from "../types";

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
        default: return state
    }
}