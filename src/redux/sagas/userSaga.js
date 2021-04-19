import {takeLeading, put, call, select} from "redux-saga/effects";
import {
    FETCH_PRESENCE, FETCH_UPDATE_USER_DATA,
    FETCH_USER_DATA,
    FETCH_USER_FOLLOWERS,
    FETCH_USER_FOLLOWING, FETCH_USER_NAME,
    FOLLOW_USER,
    UNFOLLOW_USER
} from "../types";
import {showAlert} from "../actions/appActions";
import {authentication, database} from "../../bl/firebaseConfig";
import {followSuccess, presenceAction, successUser, updateUserNameSuccess} from "../actions/userActions";

export default function* profileWatcher () {
    yield takeLeading(FETCH_USER_DATA, (action) => userDataWorker(action.uid))
    yield takeLeading(FETCH_PRESENCE, action => userPresenceWorker(action.uid))
    yield takeLeading(FETCH_USER_FOLLOWERS, (action) => userFollowersWorker(action.uid, 'followers'))
    yield takeLeading(FETCH_USER_FOLLOWING, (action) => userFollowingWorker(action.uid, 'following'))
    yield takeLeading(FOLLOW_USER, (action) => followWorker(action.uid, true))
    yield takeLeading(UNFOLLOW_USER, (action) => followWorker(action.uid, false))
    yield takeLeading(FETCH_UPDATE_USER_DATA, action => updateUserDataWorker(action.data))
    yield takeLeading(FETCH_USER_NAME, action => updateUserNameWorker(action.name))
}

function* updateUserNameWorker (name) {
    try {
        yield call(() => updateUserName(name))
        yield put(updateUserNameSuccess(name))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

function* updateUserDataWorker (data) {
    try {
        yield call(() => updateUserData(data))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

function* userPresenceWorker (uid) {
    const presence = yield call(() => fetchPresence(uid))
    yield put(presenceAction(presence))
}

function* userFollowersWorker (uid, type) {
    try {
        const followersUids = yield call(() => getFollowUids(uid, type))
        const followersNames_Photos = yield call(() => getNames_Photos(followersUids))

        yield put(followSuccess(followersNames_Photos, type))
    } catch (e) {
        console.log(e)
    }
}

function* userFollowingWorker (uid, type) {
    try {
        const followingUids = yield call(() => getFollowUids(uid, type))
        const followingNames_Photos = yield call(() => getNames_Photos(followingUids))

        yield put(followSuccess(followingNames_Photos, type))
    } catch (e) {
        console.log(e)
    }
}

function* followWorker (uid, type) {
    try {
        const currentUser = yield select(state => state.auth.uid)
        if (type) {
            yield call(() => fetchFollow(uid, currentUser))

            yield call(() => userFollowersWorker(uid, 'followers'))
        }
        if (!type) {
            yield call(() => fetchUnFollow(uid, currentUser))

            yield call(() => userFollowersWorker(uid, 'followers'))
        }

    } catch (e) {
        yield put(showAlert(e.message))
    }
}

function* userDataWorker (uid) {
    try {
        const data = yield call(() => fetchGetUserData(uid))
        yield put(successUser(data))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}


async function updateUserName (name) {
    console.log(name)
    await database.ref(`users/${authentication.currentUser.uid}/user_data/user_name`).set(name)
}

async function updateUserData (data) {
    await database.ref(`users/${authentication.currentUser.uid}/user_data`).set(data)
}

async function getNames_Photos (uids) {
    if (uids) {

        const users = {}

        await database.ref(`users`).once('value', snapshot => {
            snapshot.forEach(user => {
                if(uids.includes(user.key)) {
                    users[user.key] = {
                        user_name: user.val().user_data.user_name,
                        defaultPhotoSrc: user.val().user_data.defaultPhotoSrc
                    }
                }
            })
        })

        return users
    }
    return {}
}

async function getFollowUids (uid, type) {
    const followUids = []

    await database.ref(`users/${uid}`).once('value',snapshot => {
        snapshot.forEach(fieldName => {

            if (fieldName.key !== 'user_data') {

                const fieldType = fieldName.key

                fieldName.forEach(el => {
                    if (fieldType === type) {
                        followUids.push(el.val())
                    }
                })
            }

        })
    })

    return followUids
}

async function fetchFollow (userUid, currentUser) {
    await database.ref(`users/${userUid}/followers`).push(currentUser)
    await database.ref(`users/${currentUser}/following`).push(userUid)
}

async function fetchUnFollow (userUid, currentUser) {
    await database.ref(`users/${userUid}/followers`).once('value', snapshot => {
        snapshot.forEach(el => {
            if (el.val() === currentUser) {
                database.ref(`users/${userUid}/followers/${el.key}`).remove()
            }
        })
    })

    await database.ref(`users/${currentUser}/following`).once('value', snapshot => {
        snapshot.forEach(el => {
            if (el.val() === userUid) {
                database.ref(`users/${currentUser}/following/${el.key}`).remove()
            }
        })
    })
}

async function fetchGetUserData (uid) {
    let data
    await database.ref(`users/${uid}`).once('value', (response) => {
        data = response.val().user_data
    })

    return data
}

async function fetchPresence (uid) {
    let presence

    await database.ref(`users/${uid}/presence`).once('value', snapshot => {
        presence = snapshot.val()
    })

    return presence
}