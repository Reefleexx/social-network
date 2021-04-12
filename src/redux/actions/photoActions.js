import {FETCH_ADD_COMMENT, FETCH_ALL_COMMENTS, SUCCESS_ALL_COMMENTS} from "../types";

export const addComment = (value, photoKey, user_uid, timeStamp) => {
    return {
        type: FETCH_ADD_COMMENT,
        data: {
            value, photoKey, user_uid, timeStamp
        }
    }
}

export const successAllComments = allComments => {
    return {
        type: SUCCESS_ALL_COMMENTS,
        allComments
    }
}