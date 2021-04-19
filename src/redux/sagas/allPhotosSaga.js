import {takeLeading, put, call, select} from "redux-saga/effects";
import {ADD_PHOTO, CHANGE_DEFAULT_PHOTO, FETCH_LIKE_PHOTO} from "../types";
import {showAlert} from "../actions/appActions";
import {authentication, database, storage} from "../../bl/firebaseConfig";
import {changeStoreDefPhoto} from "../actions/userActions";


export function* allPhotosWatcher () {
    yield takeLeading(ADD_PHOTO, action => addPhotoWorker(action.photo))
    yield takeLeading(FETCH_LIKE_PHOTO,
            action => likeWorker(action.photoKey, action.user_uid, action.isLiked)
    )
    yield takeLeading(CHANGE_DEFAULT_PHOTO, action => defaultPhotoWorker(action.photo))
}

function* defaultPhotoWorker (photo) {
    try {
        const url = yield call(() => setDefaultPhoto(photo))
        yield put(changeStoreDefPhoto(url))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

function* likeWorker (photoKey, user_uid, isLiked) {
    try {

        const currentUid = authentication.currentUser.uid

        if (!isLiked) {
            yield call(() => fetchLikePhoto(photoKey, user_uid, currentUid))
        }
        if (isLiked) {
            yield call(() => fetchUnlikePhoto(photoKey, user_uid, currentUid))
        }
    } catch (e) {
        yield put (showAlert(e.message))
    }
}

function* addPhotoWorker(photo) {
    try {
        yield call(() => fetchAddPhoto(photo))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}


async function fetchAddPhoto (photo) {
    const currentUid = authentication.currentUser.uid

    const photoKey = database.ref().push().key
    const storagePhotoRef = await storage.ref(`photos/${currentUid}/photos/${photoKey}`)

    await storagePhotoRef.put(photo)

    const url = await storagePhotoRef.getDownloadURL()

    await database.ref(`users/${currentUid}/photos/${photoKey}`).set({
        src: url,
        user_uid: authentication.currentUser.uid,
        likes: [],
        comments: []
    })
}

async function fetchLikePhoto (photoKey, user_uid) {
    const key = database.ref().push().key

    await database.ref(`users/${user_uid}/photos/${photoKey}/likes/${key}`).set(user_uid)
}

async function fetchUnlikePhoto (photoKey, user_uid, currentUid) {
    let key

    const photoRef = database.ref(`users/${user_uid}/photos/${photoKey}/likes`)

    await photoRef.once('value', snap => {
        snap.forEach(snapEl => {
            if (snapEl.val() === currentUid) {
                key = snapEl.key
            }
        })
    })

    await photoRef.child(key).remove()
}

async function setDefaultPhoto (photo) {
    const currentUid = authentication.currentUser.uid

    const storageRef = storage.ref(`photos/${currentUid}/defaultPhoto`)

    await storageRef.put(photo)
    const url = await storageRef.getDownloadURL()

    await database.ref(`users/${currentUid}/user_data/defaultPhotoSrc`).set(url)

    return url
}