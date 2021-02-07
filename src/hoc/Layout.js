import React from 'react'
import classes from './Layout.module.scss'
import {connect} from "react-redux";
import WarningWin from "../containers/warningWin/warningWin";

const Layout = (props) => {
    return(
        <div className={classes.Layout}>

            {
                props.warningWin ? <WarningWin /> : null
            }

            <main className={props.warningWin ? classes.main_opacity : ''}>
                {props.children}
            </main>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        warningWin: state.app.window
    }
}

export default connect(mapStateToProps)(Layout)