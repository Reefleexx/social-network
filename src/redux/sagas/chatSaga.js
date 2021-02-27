import {takeLeading, put, call} from "redux-saga/effects";
import {FETCH_MESSAGES, FETCH_NEW_MESSAGE, FETCH_USER_DATA_CHAT} from "../types";
import {showAlert} from "../actions/appActions";
import {authentication, database} from "../../bl/firebaseConfig";
import {fetchUserSuccess, successMessages} from "../actions/chatActions";


export default function* chatWatcher () {
    yield takeLeading(FETCH_USER_DATA_CHAT, action => userDataWorker(action.uid))
    yield takeLeading(FETCH_NEW_MESSAGE, action => messageWorker(action.text, action.timeStamp, action.uid))
    yield takeLeading(FETCH_MESSAGES, action => allMessagesWorker(action.uid))
}

function* allMessagesWorker (uid) {
    try {
        const chatKey = yield call(() => getChatKey(uid, false))

        let messages

        if (chatKey) {
            messages = yield call(() => getAllMessages(chatKey))
        } else {
            messages = []
        }

        yield put(successMessages(messages, chatKey))
    } catch (e) {
        showAlert(e.message)
    }
}

function* messageWorker (text, timeStamp, uid) {
    try {
        const chatKey = yield call(() => getChatKey(uid, true))
        yield call(() => fetchNewMessage(chatKey, { text, timeStamp, uid }))
    } catch (e) {
        yield console.log(e.message)
    }
}

function* userDataWorker (uid) {
    try {
        const data = yield call(() => getUserName_Photo(uid))

        yield put(fetchUserSuccess(data))
    } catch (e) {
        yield showAlert(e.message)
    }
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

async function fetchNewMessage (chatKey, data) {
    await database.ref(`chats/${chatKey}/${data.timeStamp.toString()}`).set({
        text: data.text, sender: authentication.currentUser.uid
    })
}

async function getChatKey (uid, shouldCreate) {
    let chatKey
    const curUid = authentication.currentUser.uid

    await database.ref(`users/${curUid}/chats/${uid}`)
        .once('value', snapshot => {
            chatKey = snapshot.val()
        }
    )

    if (!chatKey) {
        if (shouldCreate) {
            const newChatRef = database.ref(`chats`).push()

            chatKey = newChatRef.key

            await database.ref(`users/${curUid}/chats/${uid}`).set(chatKey)
            await database.ref(`users/${uid}/chats/${curUid}`).set(chatKey)
        }
    }

    return chatKey
}

async function getAllMessages (chatKey) {
    const messages = {}

    await database.ref(`chats/${chatKey}`).once('value', snapshot => {
        snapshot.forEach(messageSnap => {
            messages[messageSnap.key] = messageSnap.val()
        })
    })

    return messages
}