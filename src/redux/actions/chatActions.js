import {
    CLEAR_CHAT_STORE,
    FETCH_MESSAGES,
    FETCH_NEW_MESSAGE, FETCH_UPDATE_MESSAGES,
    FETCH_USER_DATA_CHAT,
    SUCCESS_MESSAGES,
    SUCCESS_USER_DATA_CHAT
} from "../types";

export const fetchUserData = uid => {
    return {
        type: FETCH_USER_DATA_CHAT,
        uid
    }
}

export const fetchUserSuccess = data => {
    return {
        type: SUCCESS_USER_DATA_CHAT,
        user_name: data.user_name
    }
}

export const fetchNewMessage = (text, timeStamp, uid) => ({
    type: FETCH_NEW_MESSAGE,
    text, timeStamp, uid
})

export const fetchMessages = uid => {
    return {
        type: FETCH_MESSAGES,
        uid
    }
}

export const successMessages = (messages, chatKey) => {
    return {
        type: SUCCESS_MESSAGES,
        messages, chatKey
    }
}

export const clearChatStore = () => {
    return {
        type: CLEAR_CHAT_STORE
    }
}

export const fetchUpdateMessages = (key, message) => {
    return {
        type: FETCH_UPDATE_MESSAGES,
        key, message
    }
}