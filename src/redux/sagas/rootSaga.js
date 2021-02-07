import {all} from 'redux-saga/effects'
import appWatcher from "./appSaga";
import authWatcher from "./authSaga";

export default function* rootSaga () {
    yield all([
        appWatcher(),
        authWatcher()
    ])
}