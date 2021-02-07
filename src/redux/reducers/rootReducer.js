import {combineReducers} from "redux";
import appReducer from "./appRedcuer";
import authReducer from "./authReducer";

export default combineReducers({
    app: appReducer,
    auth: authReducer
})