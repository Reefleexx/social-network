import {Route, Switch, withRouter} from "react-router";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MianPage";

function App() {
    return (
       <Switch>
           <Route path={'/authPage'} exact={true} component={AuthPage}/>
           <Route path={'/'} component={MainPage}/>
       </Switch>
    );
}

export default withRouter(App);
