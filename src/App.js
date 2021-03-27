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
import {updateChats} from "./redux/actions/chatActions";


authentication.onAuthStateChanged(user => {
    func()
})

let func

function App(props) {

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
                            const messageItem = messages.val()

                            const message = {
                                key: messages.key,
                                timeStamp:  Object.keys(messageItem)[0],
                                user:  messageItem[Object.keys(messageItem)[0]].sender,
                                text: messageItem[Object.keys(messageItem)[0]].text
                            }
                            counter += 1
                            if (user.uid !== message.user) {
                                if (counter > snap.numChildren()) {
                                    const path = props.location.pathname.split('/')
                                    const lastPage = path[path.length - 1]
                                    if (lastPage !== 'chat' && lastPage !== 'messages') {
                                        dispatch(showNewMessage(message))
                                    }

                                    if (lastPage === 'messages') {
                                        dispatch(updateChats(message))
                                    }
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
