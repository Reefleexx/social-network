import {call, put, takeLeading} from "@redux-saga/core/effects";
import {CHECK_AUTH, FETCH_SIGN_IN, FETCH_SIGN_UP, SIGN_OUT} from "../types";
import {authentication} from "../../bl/firebaseConfig";
import {showAlert} from "../actions/appActions";
import {fetchAuth, fetchAuthCheck} from "../actions/authActions";


export default function* authWatcher () {
    yield takeLeading(FETCH_SIGN_UP, action => authWorker(action.data, 'sign_up'))
    yield takeLeading(FETCH_SIGN_IN, action => authWorker(action.data, 'sign_in'))
    yield takeLeading(SIGN_OUT, signOutWorker)
    yield takeLeading(CHECK_AUTH, authCheckWorker)
}

function* signOutWorker () {
    yield authentication.signOut()
}

function* authWorker (data, type) {
    try {
        const user = yield call(() => fetchSingUp(data, type))
        console.log(user.user)
        yield authentication.updateCurrentUser(user.user)
        yield put(fetchAuth(user.user.uid))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

function* authCheckWorker () {
   const user = yield authentication.currentUser
   if (user) {
       yield put(fetchAuthCheck(user.uid))
   } else {
       yield put(fetchAuthCheck(false))
   }
}

async function fetchSingUp (data, type) {
    switch (type) {
        case 'sign_in':
            return await authentication.signInWithEmailAndPassword(data.email, data.password)
        case 'sign_up':
            return await authentication.createUserWithEmailAndPassword(data.email, data.password)
        default: return await authentication.signInWithEmailAndPassword(data.email, data.password)
    }
}