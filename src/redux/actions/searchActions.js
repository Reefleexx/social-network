import {SEARCH_USER, SUCCESS_SEARCH_USER} from "../types";

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