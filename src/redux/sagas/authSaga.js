import {call, put, takeLeading, select} from "redux-saga/effects";
import {CHECK_AUTH, FETCH_SIGN_IN, FETCH_SIGN_UP, SIGN_OUT} from "../types";
import {authentication, database} from "../../bl/firebaseConfig";
import {showAlert} from "../actions/appActions";
import {fetchAuth, fetchAuthCheck} from "../actions/authActions";
import {clearUserData} from "../actions/userActions";
import {changePresence} from "../../bl/firebaseFunctions";
import {clearChatStore} from "../actions/chatActions";


export default function* authWatcher () {
    yield takeLeading(FETCH_SIGN_UP, action => authWorker(action, 'sign_up'))
    yield takeLeading(FETCH_SIGN_IN, action => authWorker(action, 'sign_in'))
    yield takeLeading(SIGN_OUT, signOutWorker)
    yield takeLeading(CHECK_AUTH, authCheckWorker)
}

function* signOutWorker () {
    const uid = yield select(state => state.auth.uid)
    const allChats = yield call(() => getAllChats(uid))

    yield call(() => clearDatabaseListeners(uid, allChats))

    yield put(clearUserData())
    yield put(clearChatStore())

    yield call(() => changePresence('offline'))

    yield authentication.signOut()
}

function* authWorker (action, type) {
    try {
        console.log(action)
        const user = yield call(() => fetchSinging(action.email, action.password, type))
        yield authentication.updateCurrentUser(user.user)
        yield put(fetchAuth(user.user.uid))

        if (type === 'sign_up') {
            yield call(() => writeToDatabase(action.data, user.user.uid))
        }

        yield call(() => changePresence('online', user.user.uid))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

function* authCheckWorker () {
   const user = yield authentication.currentUser
   if (user) {
       yield put(fetchAuthCheck(user.uid))
       yield call(() => changePresence('online', user.uid))
   } else {
       yield put(fetchAuthCheck(false))
   }
}

async function writeToDatabase (data, uid) {
    await database.ref('users/' + uid + '/user_data').set(data)
}

async function fetchSinging (email, password, type) {
    switch (type) {
        case 'sign_in':
            return await authentication.signInWithEmailAndPassword(email, password)
        case 'sign_up':
            return await authentication.createUserWithEmailAndPassword(email, password)
        default: return await authentication.signInWithEmailAndPassword(email, password)
    }
}

async function getAllChats (uid) {
    const allChats = []

    await database.ref(`users/${uid}/chats`).once('value', snap => {
        snap.forEach(snapEl => {
            allChats.push(snapEl.val())
        })
    })

    return allChats
}

async function clearDatabaseListeners (uid, allChats) {
    await database.ref(`users/${uid}`).off()

    await allChats.forEach(chatKey => {
        database.ref(`chats/${chatKey}`).off()
    })
}