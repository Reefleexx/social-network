import {
    CLOSE_WARNING_WIN,
    HIDE_ALERT,
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

export function openWarningWin (text) {
    return {
        type: OPEN_WARNING_WIN,
        windowText: text
    }
}

export function closeWarningWin () {
    return {
        type: CLOSE_WARNING_WIN
    }
}

export const showNewMessage = message => {
    console.log(message)
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