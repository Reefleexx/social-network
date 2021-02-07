import {
    SHOW_ALERT,
    HIDE_ALERT, OPEN_WARNING_WIN, CLOSE_WARNING_WIN
} from '../types'

const initialState = {
    error: null,
    window: null
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
        case OPEN_WARNING_WIN: {
            return {
                ...state,
                window: action.windowText
            }
        }
        case CLOSE_WARNING_WIN: {
            return {
                ...state,
                window: null
            }
        }
        default: return state
    }
}