import {takeLeading, put, call, all} from "redux-saga/effects";
import {FETCH_ALL_CHATS, FETCH_MESSAGES, FETCH_NEW_MESSAGE, FETCH_USER_DATA_CHAT} from "../types";
import {showAlert} from "../actions/appActions";
import {authentication, database} from "../../bl/firebaseConfig";
import {fetchUserSuccess, successAllChats, successMessages} from "../actions/chatActions";
import {decodeKey} from "../../bl/firebaseFunctions";


export default function* chatWatcher () {
    yield takeLeading(FETCH_USER_DATA_CHAT, action => userDataWorker(action.uid))
    yield takeLeading(FETCH_NEW_MESSAGE, action => messageWorker(action.text, action.timeStamp, action.uid))
    yield takeLeading(FETCH_MESSAGES, action => allMessagesWorker(action.uid))
    yield takeLeading(FETCH_ALL_CHATS, action => allChatsWorker(action.uid))
}

function* allChatsWorker (uid) {
    try {
        const latestChats = yield call(() => getAllChats(uid))
        yield put(successAllChats(latestChats))
    } catch (e) {
        showAlert(e.message)
    }
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

async function getAllChats (uid) {

    const userUids = {}
    const userNames = {}
    const userMessages = {}

    const latestChats = []

    await database.ref(`users/${uid}/chats`).once('value',  snap => {
        snap.forEach(snapEl => {
            userUids[snapEl.val()] = snapEl.key
        })
    })

    ////////////////GET chat keys array \\\\\\\\\\\\\\\\\\
    let chatKeysArr = Object.keys(userUids)

    ///////////////////  GET user information  \\\\\\\\\\\\\\\\\\\\
    for (const chatKey of chatKeysArr) {
        const userUid = userUids[chatKey]

        await database.ref(`users/${userUid}/user_data`).once('value', userSnap => {
            userNames[chatKey] = userSnap.val().user_name
        })
    }

    //////////////// GET user messages \\\\\\\\\\\\\\\\\\\\
    for (const chatKey of chatKeysArr) {
        const chatRef = database.ref(`chats/${chatKey}`)

        await chatRef.once('value', chatSnap => {
            userMessages[chatKey] = chatSnap.val()
        })
    }

    //////////////// GET last elements \\\\\\\\\\\\\\\\\\\\
    Object.keys(userMessages).forEach((chatKey, i, chatArr) => {
        const chatMessages = userMessages[chatKey]

        latestChats.push({
            chatKey: chatKey,
            user_uid: userUids[chatKey],
            user_name: userNames[chatKey],
            message: {
                time: Object.keys(chatMessages)[Object.keys(chatMessages).length - 1],
                text: chatMessages[Object.keys(chatMessages)[Object.keys(chatMessages).length - 1]].text,
                sender: chatMessages[Object.keys(chatMessages)[Object.keys(chatMessages).length - 1]].sender
            }
        })
    })

    ///////////////Order chats \\\\\\\\\\\\\\\\
    latestChats.sort(function(first, second) {return second.message.time - first.message.time})

    console.log(latestChats)

    return latestChats
}