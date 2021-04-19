import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyC0Xru3gSpGL9-YVG2DusWAQoENfUV-ZGs",
    authDomain: "social-network-91404.firebaseapp.com",
    databaseURL: "https://social-network-91404-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "social-network-91404",
    storageBucket: "social-network-91404.appspot.com",
    messagingSenderId: "554083235057",
    appId: "1:554083235057:web:4bc5ea1e7fe128a3832550",
}

firebase.initializeApp(config);

export const database = firebase.database();
export const authentication = firebase.auth();
export const storage = firebase.storage();