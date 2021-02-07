import {Redirect, Route, Switch, withRouter} from "react-router";
import MainPage from "./pages/MainPage/MianPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import {useDispatch, useSelector} from "react-redux";
import {authentication} from "./bl/firebaseConfig";
import {checkIfAuth} from "./redux/actions/authActions";


authentication.onAuthStateChanged(user => {
    console.log(authentication.currentUser)
    func()
})

let func

function App() {

    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()

    func = () => {
        dispatch(checkIfAuth())
    }

    return (
       <Switch>
           {
               user.uid ? <Redirect from={'/authPage/:type'} to={'/'}/> : <Route path={'/authPage'} component={AuthPage}/>
           }

           <Route path={'/'} component={MainPage}/>
       </Switch>
    );
}

export default withRouter(App);
