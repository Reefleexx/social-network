import React from 'react'
import classes from './Header.module.scss'
import Auth from "../../components/AuthIcon/Auth";

const Header = (props) => {
    return(
        <div className={'row justify-content-end align-items-center ' + classes.Header}>
            <Auth />
        </div>
    )
}

export default Header
