import {takeLeading, put, call} from "redux-saga/effects";
import {FETCH_ADD_COMMENT, FETCH_ALL_COMMENTS} from "../types";
import {authentication, database} from "../../bl/firebaseConfig";
import {showAlert} from "../actions/appActions";
import {successAllComments} from "../actions/photoActions";


export default function* photoWatcher () {
    yield takeLeading(FETCH_ADD_COMMENT, action => addCommentWorker(action.data))
}

function* addCommentWorker (data) {
    try {
        yield call(() => addComment(data))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

async function addComment (data) {
    await database.ref(`users/${data.user_uid}/photos/${data.photoKey}/comments/${data.timeStamp}`).set({
        text: data.value,
        sender: authentication.currentUser.uid
    })
}