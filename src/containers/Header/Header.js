import React from 'react'
import classes from './Header.module.scss'
import Auth from "../../components/UI/AuthIcon/Auth";
import {useSelector} from "react-redux";

const Header = (props) => {

    const auth = useSelector(state => state.auth)

    return(
        <div className={'row justify-content-end align-items-center ' + classes.Header}>
            {
                auth.checked && <Auth />
            }
        </div>
    )
}

export default Header
