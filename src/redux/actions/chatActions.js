import {
    CLEAR_CHAT_STORE,
    FETCH_MESSAGES,
    FETCH_NEW_MESSAGE,
    FETCH_UPDATE_MESSAGES,
    FETCH_USER_DATA_CHAT,
    SUCCESS_MESSAGES,
    SUCCESS_USER_DATA_CHAT,
    FETCH_ALL_CHATS,
    SUCCESS_ALL_CHATS,
    GET_USER_DATA,
    DELETE_CHAT,
    REMOVE_CHAT_FROM_DOM,
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
        user_name: data.user_name,
        defaultPhotoSrc: data.defaultPhotoSrc
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

export const fetchAllChats = (uid) => {
    return {
        type: FETCH_ALL_CHATS,
        uid
    }
}

export const successAllChats = (latestChats) => {
    return {
        type: SUCCESS_ALL_CHATS,
        latestChats
    }
}

export const getUserData = (newMessage) => {
    return {
        type: GET_USER_DATA,
        newMessage
    }
}

export const updateChats = (message) => {
    return dispatch => {
        const newMessage = {
            chatKey: message.key,
            user_uid: message.user,
            message: {
                time: message.timeStamp,
                text: message.text,
                sender: message.user
            }
        }

        dispatch(getUserData(newMessage))
    }
}

export const sortUpdatedChats = (message, messages) => {
    return dispatch => {
        let chats = [...messages]

        const wasChat = chats.reduce((result, el) => {
            if (el.user_uid === message.user_uid) {
                return true
            }
            return !result ? false : result
        }, false)

        if (wasChat) {
            let index = null

            messages.forEach((chat, i) => {
                if (chat.chatKey === message.chatKey) {
                    index = i
                }
            })

            chats[index] = message

            chats.sort(function(first, second) {return second.message.time - first.message.time})
            dispatch(successAllChats(chats))
        }

        if (!wasChat) {
            chats.shift(message)
            dispatch(successAllChats(chats))
        }
    }
}

export const deleteChat = user_uid => {
    return {
        type: DELETE_CHAT,
        user_uid
    }
}

export const removeChatFromDOM = user_uid => {
    return {
        type: REMOVE_CHAT_FROM_DOM,
        user_uid
    }
}