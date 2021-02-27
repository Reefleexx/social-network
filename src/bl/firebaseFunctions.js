import {authentication, database} from "./firebaseConfig";

export const changePresence = async (type, uid) => {
    await database.ref(`users/${uid ? uid : authentication.currentUser.uid}/presence`).set(type)
}

const PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

export function decodeKey(id) {
    id = id.substring(0,8);
    var timestamp = 0;
    for (let i=0; i < id.length; i++) {
        let c = id.charAt(i);
        timestamp = timestamp * 64 + PUSH_CHARS.indexOf(c);
    }
    return timestamp;
}
