import React, {useEffect} from 'react'
import classes from './Layout.module.scss'
import {connect} from "react-redux";
import Drawer from "../containers/Drawer/Drawer";
import {closeDrawer} from "../redux/actions/appActions";
import NewMessage from "../components/UI/NewMessage/NewMessage";
import {CSSTransition} from "react-transition-group";
import messageClasses from '../components/UI/NewMessage/NewMessage.module.scss'
import Alert from "../components/UI/Alert/Alert";

const Layout = (props) => {

    const shouldMessage = props.message && Object.entries(props.message).length !== 0

    useEffect(() => {
        if (props.component) {
            console.log('say hi')
            document.body.style.overflow = 'hidden'
        }
    }, [])

    return(
        <>

            {
                props.error &&
                    <Alert
                        error={props.error}
                    />
            }

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
        error: state.app.error
    }
}

const dispatchToProps = dispatch => {
    return {
        closeDrawer: () => dispatch(closeDrawer())
    }
}

export default connect(mapStateToProps, dispatchToProps)(Layout)