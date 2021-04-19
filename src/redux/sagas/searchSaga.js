import {call, takeLeading, put} from "@redux-saga/core/effects";
import {SEARCH_USER} from "../types";
import {authentication, database} from "../../bl/firebaseConfig";
import {showAlert} from "../actions/appActions";
import {successSearchUsers} from "../actions/searchActions";

export default function* searchWatcher () {
    yield takeLeading(SEARCH_USER, action => searchWorker(action.value))
}

function* searchWorker (query) {
    try {
        const usersList = yield call(() => searchUsers(query))
        yield put(successSearchUsers(usersList))
    } catch (e) {
        yield put(showAlert(e.message))
    }
}

async function searchUsers (query) {
    const usersRef = await database.ref('/users').orderByChild('user_data/user_name')
    const usersList = []

    await usersRef.once('value',  snapshot => {

        snapshot.forEach(userSnap => {
            const uid = userSnap.key
            const user = userSnap.val()

            const userName = user.user_data.user_name.toLowerCase()

            if (userName.includes(query.toLowerCase())){
                usersList.push({
                    uid,
                    ...user
                })
            }
        })
    })

    return usersList
}