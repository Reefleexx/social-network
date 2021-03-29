import {ADD_PHOTO} from "../types";

export const addPhoto = (photo) => {
    return {
        type: ADD_PHOTO,
        photo
    }
}