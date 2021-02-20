import {all} from 'redux-saga/effects'
import appWatcher from "./appSaga";
import authWatcher from "./authSaga";
import profileWatcher from "./userSaga";
import searchWatcher from "./searchSaga";

export default function* rootSaga () {
    yield all([
        appWatcher(),
        authWatcher(),
        profileWatcher(),
        searchWatcher()
    ])
}