import {useEffect, useState} from 'react'
import {Redirect, Route, Switch, withRouter} from "react-router";
import MainPage from "./pages/MainPage/MianPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {authentication} from "./bl/firebaseConfig";
import {checkIfAuth} from "./redux/actions/authActions";
import {database} from './bl/firebaseConfig'
import {decodeKey} from "./bl/firebaseFunctions";
import {showNewMessage} from "./redux/actions/appActions";


authentication.onAuthStateChanged(user => {
    func()
})

let func

function App() {

    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()

    func = () => {
        dispatch(checkIfAuth())
    }

    useEffect(() => {
        setTimeout(() => {
            if (user.uid) {
                const userChats = database.ref(`users/${user.uid}/chats`)
                const chats = database.ref(`chats`)

                let counter = 0
                userChats.on('value', async snap => {
                    const allUsers = snap.val()

                    const last = {
                        key: '',
                        user: '',
                        timeStamp: 0
                    }

                    await snap.forEach(snapEl => {
                        const element = snapEl.val()

                        const timeStamp = decodeKey(element)

                        if (last.timeStamp < timeStamp) {
                            last.key = element
                            last.timeStamp = timeStamp
                            last.user = snapEl.key
                        }

                        chats.child(element).limitToLast(1).on('value', messages => {
                            const secret = messages.val()

                            const message = {
                                key: messages.key,
                                timeStamp:  Object.keys(secret)[0],
                                user:  secret[Object.keys(secret)[0]].sender
                            }
                            counter += 1
                            if (user.uid !== message.user) {
                                if (counter > snap.numChildren()) {
                                    dispatch(showNewMessage(message))
                                }
                            }
                        })

                    })
                })
            }
        }, 10)
    }, [user.uid])

    return (
       <Switch>
           {
               user.uid ? <Redirect from={'/authPage/:type'} to={'/'}/> : <Route path={'/authPage'} component={AuthPage}/>
           }

           <Route path={'/'} component={MainPage}/>
       </Switch>
    );
}

export default withRouter(App);
