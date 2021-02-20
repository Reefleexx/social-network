import {
    CLEAR_USER_DATA, CLOSE_ALL,
    FOLLOWERS_SUCCESS,
    FOLLOWING_SUCCESS,
    OPEN_ALL,
    SUCCESS_USER_DATA
} from "../types";

const initialState = {
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
        case CLEAR_USER_DATA: {
            return {
                ...initialState
            }
        }
        case FOLLOWERS_SUCCESS: {
            return {
                ...state,
                followers: Object.keys(action.followers).reduce((result, key) => {
                    result[key] = {
                        ...state.followers[key],
                        user_name: action.followers[key]
                    }

                    return result
                }, {})
            }
        }
        case FOLLOWING_SUCCESS: {
            return {
                ...state,
                following: Object.keys(action.following).reduce((result, key) => {
                    result[key] = {
                        ...state.following[key],
                        user_name: action.following[key]
                    }

                    return result
                }, {})
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
        default: return state
    }
}