import {
    CHANGE_DEFPHOTO_URL,
    CLEAR_USER_DATA, CLOSE_ALL, FETCH_PRESENCE, FETCH_UPDATE_USER_DATA,
    FETCH_USER_DATA, FETCH_USER_FOLLOWERS, FETCH_USER_FOLLOWING, FETCH_USER_NAME,
    FOLLOW_USER, FOLLOWERS_SUCCESS, FOLLOWING_SUCCESS, OPEN_ALL, SUCCESS_UPDATE_USER_DATA,
    SUCCESS_USER_DATA, SUCCESS_USER_NAME,
    UNFOLLOW_USER
} from "../types";

export const fetchUser = (uid) => {
    return dispatch => {
        dispatch(fetchUserData(uid))
        dispatch(fetchUserFollowers(uid))
        dispatch(fetchUserFollowing(uid))
        dispatch(fetchPresence(uid))
    }
}

export const fetchPresence = uid => {
    return {
        type: FETCH_PRESENCE,
        uid
    }
}

export const fetchUserFollowers = (uid) => {
    return {
        type: FETCH_USER_FOLLOWERS,
        uid
    }
}

export const fetchUserFollowing = (uid) => {
    return {
        type: FETCH_USER_FOLLOWING,
        uid
    }
}

export const fetchUserData = uid => {
    return {
        type: FETCH_USER_DATA,
        uid
    }
}

export const successUser = data => {
    return {
        type: SUCCESS_USER_DATA,
        data
    }
}

export const followSuccess = (names_photos, type) => {
    return dispatch => {
        if (type === 'followers') dispatch(putFollowers(names_photos))
        if (type === 'following') dispatch(putFollowing(names_photos))
    }
}

const putFollowers = (followers) => {
    return {
        type: FOLLOWERS_SUCCESS,
        followers
    }
}

const putFollowing = (following) => {
    return {
        type: FOLLOWING_SUCCESS,
        following
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA
    }
}

export const followUser = uid => {
    return {
        type: FOLLOW_USER,
        uid
    }
}

export const unFollowUser = uid => {
    return {
        type: UNFOLLOW_USER,
        uid
    }
}

export const openAllType = type => {
    return {
        type: OPEN_ALL,
        kind: type
    }
}

export const closeAll = () => {
    return {
        type: CLOSE_ALL
    }
}

export const presenceAction = presence => {
    return {
        type: FETCH_PRESENCE,
        presence
    }
}

export const changeStoreDefPhoto = photoUrl => {
    return {
        type: CHANGE_DEFPHOTO_URL,
        photoUrl
    }
}

export const fetchUpdateUserData = data => {
    return {
        type: FETCH_UPDATE_USER_DATA,
        data
    }
}

export const changeUserName = name => {
    return {
        type: FETCH_USER_NAME,
        name
    }
}

export const updateUserNameSuccess = name => {
    return {
        type: SUCCESS_USER_NAME,
        name
    }
}