import React from 'react'
import classes from "./MainPage.module.scss";
import Header from "../../containers/Header/Header";
import Sidebar from "../../containers/Sidebar/Sidebar";
import {Route, Switch} from "react-router";
import Profile from "../../containers/Main/Profile/Profile";
import Messages from "../../containers/Main/Messages/Messages";
import Search from "../../containers/Main/Search/Search";
import Favorites from "../../containers/Main/Favorites/Favorites";

const some = () => <div className={'col-9 ' + classes.some}/>

const MainPage = (props) => {
    return(
        <div className={'container-lg mt-3 justify-content-between' + classes.MainPage}>
            <Header/>

        <div className={'row p-2 mt-3'} style={{position: 'relative'}}>
                <Sidebar/>

                <Switch>
                    <Route path={'/messages'} component={Messages} exact={true}/>
                    <Route path={'/messages/:id'} component={some} exact={true}/>
                    <Route path={'/profile'} component={Profile} exact={true}/>
                    <Route path={'/favorites'} component={Favorites} exact={true}/>
                    <Route path={'/search'} component={Search} exact={true}/>
                    <Route path={'/'} component={Search} exact={true}/>
                </Switch>

            </div>

        </div>
    )
}

export default MainPage