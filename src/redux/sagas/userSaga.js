import {takeLeading, put, call, select} from "redux-saga/effects";
import {FETCH_USER_DATA, FETCH_USER_FOLLOWERS, FETCH_USER_FOLLOWING, FOLLOW_USER, UNFOLLOW_USER} from "../types";
import {showAlert} from "../actions/appActions";
import {database} from "../../bl/firebaseConfig";
import {followSuccess, successUser} from "../actions/userActions";

export default function* profileWatcher () {
    yield takeLeading(FETCH_USER_DATA, (action) => userDataWorker(action.uid))
    yield takeLeading(FETCH_USER_FOLLOWERS, (action) => userFollowersWorker(action.uid, 'followers'))
    yield takeLeading(FETCH_USER_FOLLOWING, (action) => userFollowingWorker(action.uid, 'following'))
    yield takeLeading(FOLLOW_USER, (action) => followWorker(action.uid, true))
    yield takeLeading(UNFOLLOW_USER, (action) => followWorker(action.uid, false))
}

// function* userFollowsWorker (uid, type) {
//     try {
//         if (type) {
//
//             if (type === 'followers') {
//                 const [allUids, followersNames] = yield call(() => getAllFollows(uid, type))
//                 const followingNames = {}
//
//                 yield put(followSuccess(allUids, followersNames, followingNames))
//             }
//
//             if (type === 'following') {
//                 const [allUids, followingNames] = yield call(() => getAllFollows(uid, type))
//                 const followersNames = {}
//
//                 yield put(followSuccess(allUids, followersNames, followingNames))
//             }
//
//         } else {
//             const [allUids, followersNames, followingNames] = yield call(() => getAllFollows(uid))
//
//             yield put(followSuccess(allUids, followersNames, followingNames))
//         }
//
//    } catch (e) {
//         console.log(e)
//         yield put(showAlert(e.message))
//    }
// }

function* userFollowersWorker (uid, type) {
    try {
        const followersUids = yield call(() => getFollowUids(uid, type))
        const followersNames = yield call(() => getNames(followersUids))

        yield put(followSuccess(followersNames, type))
    } catch (e) {
        console.log(e)
    }
}

function* userFollowingWorker (uid, type) {
    try {
        const followingUids = yield call(() => getFollowUids(uid, type))
        const followingNames = yield call(() => getNames(followingUids))

        yield put(followSuccess(followingNames, type))
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


async function getNames (uids) {
    if (uids) {

        const users = {}

        await database.ref(`users`).once('value', snapshot => {
            snapshot.forEach(user => {
                if(uids.includes(user.key)) {
                    users[user.key] = user.val().user_data.user_name
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

    await database.ref(`users/${uid}/user_data`).once("value", (response) => {
        data = response.val()
    })

    return data
}
