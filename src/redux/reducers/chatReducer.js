import {
    CLEAR_CHAT_STORE,
    FETCH_UPDATE_MESSAGES,
    REMOVE_CHAT_FROM_DOM,
    SUCCESS_ALL_CHATS,
    SUCCESS_MESSAGES,
    SUCCESS_USER_DATA_CHAT
} from "../types";


const initialState = {
    user_name: '___',
    photo_url: '',
    messages: {},
    chatKey: null,
    latestChats: []
}

export default function chatReducer (state = initialState, action) {
    switch (action.type) {
        case SUCCESS_USER_DATA_CHAT: {
            return {
                ...state,
                user_name: action.user_name,
                photo_url: action.defaultPhotoSrc
            }
        }
        case SUCCESS_MESSAGES: {
            return {
                ...state,
                messages: action.messages,
                chatKey: action.chatKey
            }
        }
        case CLEAR_CHAT_STORE: {
            return {
                ...initialState
            }
        }
        case FETCH_UPDATE_MESSAGES: {
            return {
                ...state,
                messages: {...state.messages, [action.key]: action.message}
            }
        }
        case SUCCESS_ALL_CHATS: {
            return {
                ...state,
                latestChats: action.latestChats
            }
        }
        case REMOVE_CHAT_FROM_DOM: {
            return {
                ...state,
                latestChats: state.latestChats.filter(chat => {
                    if (chat.user_uid !== action.user_uid) {
                        return chat
                    }
                })
            }
        }
        default: return state
    }
}