import React from 'react'
import classes from './NavBar.module.scss'
import {NavLink} from "react-router-dom";

const navLinks = [
    {text: 'Messages', to: 'messages', exact: true},
    {text: 'Profile', to: 'profile', exact: true},
    {text: 'Favorites', to: 'favorites', exact: true},
    {text: 'Search', to: 'search', exact: true}
]

const NavBar = (props) => {

    const renderLinks = () => (
        <div className={classes.links}>
            { navLinks.map((link, index) => (
                <div className={classes.link} key={index}>
                    <NavLink
                        key={index}
                        to={link.to}
                        exact={link.exact}
                    >
                        {link.text}
                    </NavLink>
                </div>
            ))}
        </div>
    )

    return(
        <nav className={'ml-2 mt-4 ' + classes.NavBar}>
            { renderLinks() }
        </nav>
    )
}

export default NavBar