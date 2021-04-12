import React from 'react'
import classes from './Layout.module.scss'
import {connect, useDispatch} from "react-redux";
import WarningWin from "../containers/warningWin/warningWin";
import Alert from "../components/UI/Alert/Alert";
import AllFollows from "../containers/allFollows/allFollows";
import Drawer from "../containers/Drawer/Drawer";
import {closeAll} from "../redux/actions/userActions";
import {closeDrawer, closeWarningWin} from "../redux/actions/appActions";
import NewMessage from "../components/UI/NewMessage/NewMessage";
import {CSSTransition} from "react-transition-group";
import messageClasses from '../components/UI/NewMessage/NewMessage.module.scss'

const Layout = (props) => {

    const shouldMessage = props.message && Object.entries(props.message).length !== 0

    return(
        <>

            {
                props.component ?
                    <Drawer onClose={props.closeDrawer}>
                        {props.component()}
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

            <main className={props.component ? classes.main_opacity : null}>
                {props.children}
            </main>
        </>
    )
}

const mapStateToProps = state => {
    return {
        message: state.app.message,
        component: state.app.component,
    }
}

const dispatchToProps = dispatch => {
    return {
        closeDrawer: () => dispatch(closeDrawer())
    }
}

export default connect(mapStateToProps, dispatchToProps)(Layout)