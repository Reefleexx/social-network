import {
    CHANGE_DEFPHOTO_URL,
    CLEAR_USER_DATA, CLOSE_ALL, FETCH_PRESENCE,
    FOLLOWERS_SUCCESS,
    FOLLOWING_SUCCESS,
    OPEN_ALL,
    SUCCESS_USER_DATA, SUCCESS_USER_NAME
} from "../types";


const initialState = {
    presence: 'offline',
    user_data: {
        location: {
            country: '___',
            region: '___'
        },
        dateOfBirth: {
            day: '___',
            month: '___',
            year: '___'
        },
        name: '___',
        surname: '___',
        user_name: '___',
        about: ''
    },
    followers: {},
    following: {},
    allType: null
}

export default function userReducer (state = initialState, action) {
    switch (action.type) {
        case SUCCESS_USER_DATA: {
            return {
                ...state,
                user_data: action.data
            }
        }
        case FETCH_PRESENCE: {
            return {
                ...state,
                presence: action.presence
            }
        }
        case CLEAR_USER_DATA: {
            return {
                ...initialState
            }
        }
        case FOLLOWERS_SUCCESS: {
            return {
                ...state,
                followers: action.followers
            }
        }
        case FOLLOWING_SUCCESS: {
            return {
                ...state,
                following: action.following
            }
        }
        case OPEN_ALL: {
            return {
                ...state,
                allType: action.kind
            }
        }
        case CLOSE_ALL: {
            return {
                ...state,
                allType: null
            }
        }
        case CHANGE_DEFPHOTO_URL: {
            return {
                ...state,
                user_data: {
                    ...state.user_data,
                    defaultPhotoSrc: action.photoUrl
                }
            }
        }
        case SUCCESS_USER_NAME: {
            return {
                ...state,
                user_data: {
                    ...state.user_data,
                    user_name: action.name
                }
            }
        }
        default: return state
    }
}