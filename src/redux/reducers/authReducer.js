import {
    SIGN_UP_SUCCESS,
    FETCH_SIGN_UP, FETCH_AUTH, SIGN_OUT, AUTH_CHECKED
} from "../types";

const initialState = {
    uid: null,
    user_name: null,
    checked: false
}

export default function authReducer (state = initialState, action) {
    switch(action.type) {
        case FETCH_AUTH: {
            return {
                ...state,
                uid: action.uid
            }
        }

        case AUTH_CHECKED: {
            return {
                ...state, checked: true
            }
        }

        case SIGN_OUT: {
            return {
                ...state,
                uid: null
            }
        }

        //
        // case FETCH_SIGN_UP:
        //     return {
        //         ...state
        //     }

        default: return state
    }
}