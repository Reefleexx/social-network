import React from 'react'
import classes from './Layout.module.scss'
import {connect, useDispatch} from "react-redux";
import WarningWin from "../containers/warningWin/warningWin";
import Alert from "../components/UI/Alert/Alert";
import AllFollows from "../containers/allFollows/allFollows";
import Drawer from "../containers/Drawer/Drawer";
import {closeAll} from "../redux/actions/userActions";
import {closeWarningWin} from "../redux/actions/appActions";

const Layout = (props) => {

    const dispatch = useDispatch()

    const allClose = () => {
        dispatch(closeAll())
    }

    const warningClose = () => {
        dispatch(closeWarningWin())
    }

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
        user_name: state.user.user_data.user_name
    }
}

export default connect(mapStateToProps)(Layout)