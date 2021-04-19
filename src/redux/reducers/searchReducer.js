import {CLEAR_SEARCH_STORE, SUCCESS_SEARCH_USER} from "../types";

const initialState = {
    request: '',
    users: null
}

export default function searchReducer (state = initialState, action) {
    switch (action.type) {
        case SUCCESS_SEARCH_USER: {
            return {
                ...state,
                users: action.usersList
            }
        }
        case CLEAR_SEARCH_STORE: {
            return initialState
        }
        default: return state
    }
}