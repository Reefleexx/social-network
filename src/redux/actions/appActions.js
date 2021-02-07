import {
    CLOSE_WARNING_WIN,
    HIDE_ALERT,
    OPEN_WARNING_WIN,
    SHOW_ALERT
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