import React from 'react'
import classes from './Sidebar.module.scss'
import NavBar from "../../components/NavBar/NavBar";

const Sidebar = (props) => {
    return(
        <div className={'' + classes.Sidebar}>
            <NavBar/>
        </div>
    )
}

export default Sidebar
