import {AUTH_CHECKED, CHECK_AUTH, FETCH_AUTH, FETCH_SIGN_IN, FETCH_SIGN_UP, SIGN_OUT} from "../types";

export const fetchSignUp = (data) => {
    return {
        type: FETCH_SIGN_UP,
        data: {
            user_name: data.user_name,
            name: data.name,
            surname: data.surname,
            location: data.location,
            sex: data.sex,
            dateOfBirth: data.dateOfBirth,
            about: data.about
        },
        email: data.email,
        password: data.password
    }
}

export const fetchSignIn = (data) => {
    return {
        type: FETCH_SIGN_IN,
        email: data.email,
        password: data.password
    }
}

export const fetchAuth = (uid) => {
    return {
        type: FETCH_AUTH,
        uid
    }
}

export const fetchAuthCheck = (uid) => {
    return (dispatch) => {
        if (uid) dispatch(fetchAuth(uid))
        dispatch({ type: AUTH_CHECKED })
    }
}

export const fetchSignOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const checkIfAuth = () => {
    return {
        type: CHECK_AUTH
    }
}