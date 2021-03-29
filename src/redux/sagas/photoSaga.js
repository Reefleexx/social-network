import {takeLeading, put, call} from "redux-saga/effects";
import {ADD_PHOTO, OPEN_PHOTO} from "../types";
import {showAlert} from "../actions/appActions";

export function* photoWatcher () {
    yield takeLeading(OPEN_PHOTO, action => openPhotoWorker(action.id))
    yield takeLeading(ADD_PHOTO, action => addPhotoWorker(action.photo))
}

function* addPhotoWorker(photo) {
    try {

    } catch (e) {
        yield put(showAlert(e.message))
    }
}

function* openPhotoWorker (id) {
    try {
        const url = yield call(() => getPhotoUrl(id))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

async function getPhotoUrl(id) {

}