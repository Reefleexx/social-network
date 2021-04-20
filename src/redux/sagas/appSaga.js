import {takeLeading, call, put} from "redux-saga/effects";
import {changePresence} from "../../bl/firebaseFunctions";
import {authentication, database} from "../../bl/firebaseConfig";
import {SHOW_NEW_MESSAGE} from "../types";
import {successNewMessage} from "../actions/appActions";

window.addEventListener('beforeunload',  async () => {
    await changePresence('offline', authentication.currentUser.uid)
})

document.addEventListener('visibilitychange', async () => {
    if (authentication.currentUser) {
        if (document.hidden) {
            await changePresence('away', authentication.currentUser.uid)
        } else {
            await changePresence('online', authentication.currentUser.uid)
        }
    }
})

export default function* appWatcher () {
    yield takeLeading(SHOW_NEW_MESSAGE, action => showMessageWorker(action.sender_uid))
}

function* showMessageWorker (sender_uid) {

    const userData = yield (call(() => getUserName_Photo(sender_uid)))

    yield put(successNewMessage(sender_uid, userData.user_name))
}

async function getUserName_Photo (uid) {
    const data = {
        user_name: ''
    }

    await database.ref(`users/${uid}/user_data`).once('value', snapshot => {
        data.user_name = snapshot.val().user_name
    })

    return data
}