import {useEffect, useState} from 'react'
import {Redirect, Route, Switch, withRouter} from "react-router";
import MainPage from "./pages/MainPage/MianPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {authentication} from "./bl/firebaseConfig";
import {checkIfAuth} from "./redux/actions/authActions";
import {database} from './bl/firebaseConfig'
import {showNewMessage} from "./redux/actions/appActions";
import {updateChats} from "./redux/actions/chatActions";


authentication.onAuthStateChanged(user => {
    func()
})

let func

function App(props) {

    const currentUid = useSelector(state => state.auth.uid)
    const dispatch = useDispatch()

    func = () => {
        dispatch(checkIfAuth())
    }

    useEffect(() => {
        console.log(currentUid)
        if (currentUid) {
            const yourChatsRef = database.ref(`users/${currentUid}/chats`)
            const allChatsRef = database.ref(`chats`)

            let counter = 0

            yourChatsRef.on('value', yourChatsSnap => {
                yourChatsSnap.forEach(yourChatSnap => {
                    const chatKey = yourChatSnap.val()

                    allChatsRef.child(chatKey).on('value', snap => {
                        allChatsRef.child(chatKey).limitToLast(1).once('value', messageSnap => {
                            const val = messageSnap.val()

                            const message = val[Object.keys(val)[0]]
                            const timeStamp = Object.keys(val)[0]

                            if (counter > 1) {
                                if (message.sender !== currentUid) {
                                    const path = window.location.pathname
                                    const pathUid = path.split('/')[path.split('/').length - 1]

                                    if (pathUid !== 'chat' && pathUid !== 'messages') {
                                        dispatch(showNewMessage(message.sender))
                                    }
                                    if (pathUid === 'messages') {
                                        dispatch(updateChats({
                                            key: chatKey,
                                            user: message.sender,
                                            timeStamp: timeStamp,
                                            text: message.text
                                        }))
                                    }
                                }
                            }

                            counter ++
                        })
                    })
                })

            })
        }
    }, [currentUid])

    return (
       <Switch>
           {
               currentUid ? <Redirect from={'/authPage/:type'} to={'/'}/> : <Route path={'/authPage'} component={AuthPage}/>
           }

           <Route path={'/'} component={MainPage}/>
       </Switch>
    );
}

export default withRouter(App);
