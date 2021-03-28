import React from 'react'
import classes from './NavBar.module.scss'
import {withRouter} from "react-router";
import {useSelector} from "react-redux";

// const navLinks = [
//     {text: 'Messages', to: 'messages', exact: true},
//     {text: 'Profile', to: 'profile', exact: true},
//     {text: 'Favorites', to: 'favorites', exact: true},
//     {text: 'Search', to: 'search', exact: true}
// ]


const NavBar = (props) => {

    const auth = useSelector(state => state.auth)

    let navLinks

    if (auth.uid) {
        navLinks = [
            {text: 'Messages', to: '/messages', exact: true},
            {text: 'Profile', to: '/profile', exact: true},
            {text: 'Album', to: '/album', exact: true},
            {text: 'Search', to: '/search', exact: true}
        ]
    } else {
        navLinks = [
            {text: 'Search', to: '/search', exact: true}
        ]
    }


    const onLinkClick = (e, to) => {
        e.preventDefault()
        props.history.push(to)
    }

    const renderLinks = () => (
        <div className={classes.links}>
            { navLinks.map((link, index) => (
                <div className={classes.link} key={index}>
                    <span
                        key={index}
                        onClick={e => onLinkClick(e, link.to)}
                    >
                        {link.text}
                    </span>
                </div>
            ))}
        </div>
    )

    return(
        <nav className={'ml-2 mt-4 ' + classes.NavBar}>
            {
                auth.checked && renderLinks()
            }
        </nav>
    )
}

export default withRouter(NavBar)