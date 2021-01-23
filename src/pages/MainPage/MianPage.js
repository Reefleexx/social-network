import React from 'react'
import classes from "./MainPage.module.scss";
import Header from "../../containers/Header/Header";
import Sidebar from "../../containers/Sidebar/Sidebar";
import {Route, Switch} from "react-router";
import Foot from "../../containers/Foot/Foot";
import Profile from "../../containers/Profile/Profile";

const some = () => <div className={'col-9 ' + classes.some}/>

const MainPage = (props) => {
    return(
        <div className={'container-lg mt-3 justify-content-between' + classes.MainPage}>
            <Header/>

            <div className={'row p-2 mt-3'} style={{position: 'relative'}}>
                <Sidebar/>

                <Switch>
                    <Route path={'/messages'} component={some} exact={true}/>
                    <Route path={'/profile'} component={Profile} exact={true}/>
                    <Route path={'/favorites'} component={some} exact={true}/>
                    <Route path={'/search'} component={some} exact={true}/>
                    <Route path={'/'} component={some} exact={true}/>
                </Switch>

            </div>

            {/*<Foot/>*/}
        </div>
    )
}

export default MainPage