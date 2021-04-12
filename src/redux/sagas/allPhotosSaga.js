import {takeLeading, put, call} from "redux-saga/effects";
import {ADD_PHOTO, FETCH_LIKE_PHOTO, OPEN_PHOTO} from "../types";
import {showAlert} from "../actions/appActions";
import {authentication, database, storage} from "../../bl/firebaseConfig";

export function* allPhotosWatcher () {
    yield takeLeading(OPEN_PHOTO, action => openPhotoWorker(action.id))
    yield takeLeading(ADD_PHOTO, action => addPhotoWorker(action.photo))
    yield takeLeading(FETCH_LIKE_PHOTO,
            action => likeWorker(action.photoKey, action.user_uid, action.isLiked)
    )
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
        const currentUid = authentication.currentUser.uid

        yield call(() => fetchAddPhoto(photo, currentUid))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

function* openPhotoWorker (id) {
    try {
        // const url = yield call(() => getPhotoUrl(id))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

async function fetchAddPhoto (photo, user_uid) {
    const photoKey = database.ref().push().key

    const storagePhotoRef = await storage.ref(`photos/${user_uid}/${photoKey}`)

    await storagePhotoRef.put(photo)

    const url = await storagePhotoRef.getDownloadURL()

    await database.ref(`users/${user_uid}/photos/${photoKey}`).set({
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