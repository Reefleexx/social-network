import React from 'react'
import classes from "./MainPage.module.scss";
import {Redirect, Route, Switch} from "react-router";
import {useSelector} from "react-redux";
import Header from "../../containers/Header/Header";
import Sidebar from "../../containers/Sidebar/Sidebar";
import Album from "../../containers/Main/Album/Album";
import Profile from "../../containers/Main/Profile/Profile";
import Messages from "../../containers/Main/Messages/Messages";
import Search from "../../containers/Main/Search/Search";
import Chat from "../../containers/Main/Chat/Chat";
import Favorites from "../../containers/Main/Favorites/Favorites";


const MainPage = (props) => {

    const auth = useSelector(state => state.auth)

    let routes

    if (auth.uid) {
        routes = <Switch>
            <Route path={'/search'} component={Search} exact={true}/>
            <Route path={'/search/:uid'} component={() => <Profile/>} exact={true}/>
            <Route path={'/:uid/chat'} component={Chat} exact={true}/>
            <Route path={'/messages'} component={Messages} exact={true}/>
            <Route path={'/profile'} component={() => <Profile/>} exact={true}/>
            <Route path={'/album'} component={Album} exact={true}/>
            <Route path={'/'} component={Search} exact={true}/>
            <Redirect to={'/'} componenet={Search} />
        </Switch>
    } else {
        routes = <Switch>
            <Route path={'/search'} component={Search} exact={true}/>
            {/*<Route path={'/search/:uid'} component={Profile} exact={true}/>*/}
            <Route path={'/'} component={Search} exact={true}/>
            <Redirect to={'/'} componenet={Search} />
        </Switch>
    }

    return(
        <div className={'container-lg mt-3 justify-content-between' + classes.MainPage}>
            <Header/>

            <div className={classes.mainRow} >
                <Sidebar/>

                {
                    auth.checked && routes
                }
            </div>

        </div>
    )
}

export default MainPage