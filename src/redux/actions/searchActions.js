import {CLEAR_SEARCH_STORE, SEARCH_USER, SUCCESS_SEARCH_USER} from "../types";

export const fetchSearchUser = (value) => {
    return {
        type: SEARCH_USER,
        value
    }
}

export const successSearchUsers = usersList => {
    return {
        type: SUCCESS_SEARCH_USER,
        usersList
    }
}

export const clearSearchStore = () => {
    return {
        type: CLEAR_SEARCH_STORE
    }
}