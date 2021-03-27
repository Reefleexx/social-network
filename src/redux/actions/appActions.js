import {
    CLOSE_WARNING_WIN,
    HIDE_ALERT, HIDE_NEW_MESSAGE,
    OPEN_WARNING_WIN,
    SHOW_ALERT, SHOW_NEW_MESSAGE, SUCCESS_NEW_MESSAGE
} from "../types";

let timer1

function displayAlert (text) {
    return {
        type: SHOW_ALERT,
        error: text
    }
}

export function showAlert (text) {
    return async (dispatch) => {

        dispatch(displayAlert(text))

        timer1 = setTimeout(() => {
            dispatch(hideAlert())
        }, 9000)
    }
}

export function hideAlert () {
    clearTimeout(timer1)
    return {
        type: HIDE_ALERT
    }
}

export function showWarningWin (text, funcCallback) {
    return {
        type: OPEN_WARNING_WIN,
        text, funcCallback
    }
}

export function closeWarningWin () {
    return {
        type: CLOSE_WARNING_WIN
    }
}


////////////// New message pop up \\\\\\\\\\\\\\\\\
let messageTimer

export const showNewMessage = message => {
    return dispatch => {
        dispatch(hideNewMessage())
        clearTimeout(messageTimer)

        messageTimer = setTimeout(() => {
            dispatch(hideNewMessage())
        }, 7000)
        dispatch(fetchNewMessage(message))
    }

}

const fetchNewMessage = message => {
    return {
        type: SHOW_NEW_MESSAGE,
        message
    }
}

export const successNewMessage = (uid, user_name) => {
    return {
        type: SUCCESS_NEW_MESSAGE,
        message: {
            uid, user_name
        }
    }
}

export const hideNewMessage = () => {
    clearTimeout(messageTimer)
    return {
        type: HIDE_NEW_MESSAGE
    }
}
