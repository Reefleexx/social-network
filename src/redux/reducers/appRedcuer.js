import {
    SHOW_ALERT,
    HIDE_ALERT,
    OPEN_WARNING_WIN,
    CLOSE_WARNING_WIN,
    HIDE_NEW_MESSAGE,
    SUCCESS_NEW_MESSAGE,
    OPEN_PHOTO,
    OPEN_DRAWER,
    CLOSE_DRAWER
} from '../types'

const initialState = {
    error: null,
    window: null,
    message: null,
    funcCallback: null,
    photo: null,
    component: null
}

export default function appReducer (state = initialState, action) {
    switch (action.type) {
        case SHOW_ALERT: {
            return {
                ...state,
                error: action.error
            }
        }
        case HIDE_ALERT: {
            return {
                ...state, error: null
            }
        }
        case OPEN_DRAWER: {
            return {
                ...state,
                component: action.component
            }
        }
        case CLOSE_DRAWER: {
            return {
                ...state,
                component: null
            }
        }
        case OPEN_WARNING_WIN: {
            return {
                ...state,
                window: action.text,
                funcCallback: action.funcCallback
            }
        }
        case CLOSE_WARNING_WIN: {
            return {
                ...state,
                window: null
            }
        }
        case SUCCESS_NEW_MESSAGE: {
            return {
                ...state,
                message: action.message
            }
        }
        case HIDE_NEW_MESSAGE: {
            return {
                ...state,
                message: {}
            }
        }
        case OPEN_PHOTO: {
            return {
                ...state,
                photo: action.id
            }
        }
        default: return state
    }
}