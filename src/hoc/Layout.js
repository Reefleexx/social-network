import React from 'react'
import classes from './Layout.module.scss'
import {connect, useDispatch} from "react-redux";
import WarningWin from "../containers/warningWin/warningWin";
import Alert from "../components/UI/Alert/Alert";
import AllFollows from "../containers/allFollows/allFollows";
import Drawer from "../containers/Drawer/Drawer";
import {closeAll} from "../redux/actions/userActions";
import {closeWarningWin} from "../redux/actions/appActions";
import NewMessage from "../components/UI/NewMessage/NewMessage";
import {CSSTransition} from "react-transition-group";
import messageClasses from '../components/UI/NewMessage/NewMessage.module.scss'

const Layout = (props) => {
    const dispatch = useDispatch()

    const allClose = () => {
        dispatch(closeAll())
    }

    const warningClose = () => {
        dispatch(closeWarningWin())
    }

    const shouldMessage = props.message && Object.entries(props.message).length !== 0

    return(
        <div className={classes.Layout}>

            {
                props.warningWin ?
                    <Drawer onClose={warningClose}>
                        <WarningWin />
                    </Drawer>
                    : null
            }

            {
                props.error ? <Alert/> : null
            }

            {
                props.allType ?
                    <Drawer onClose={allClose}>
                        <AllFollows type={props.allType} user_name={props.user_name}/>
                    </Drawer>
                    : null
            }

            {
                    <CSSTransition
                        in={shouldMessage}
                        timeout={200}
                        classNames={{
                            enter: messageClasses['message-enter'],
                            enterActive: messageClasses['message-enter-active'],
                            exit: messageClasses['message-exit'],
                            exitActive: messageClasses['message-exit-active']
                        }}
                        mountOnEnter
                        unmountOnExit
                    >
                        <NewMessage
                            amount={1}
                            user_name={shouldMessage ? props.message.user_name : ''}
                            userUid={shouldMessage ? props.message.uid : ''}
                        />
                    </CSSTransition>
            }

            <main className={props.warningWin || props.allType ? classes.main_opacity : null}>
                {props.children}
            </main>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        warningWin: state.app.window,
        allOpen: state.user.allType,
        error: state.app.error,
        allType: state.user.allType,
        user_name: state.user.user_data.user_name,
        message: state.app.message
    }
}

export default connect(mapStateToProps)(Layout)