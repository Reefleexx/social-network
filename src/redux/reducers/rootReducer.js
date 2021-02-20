import {combineReducers} from "redux";
import appReducer from "./appRedcuer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import searchReducer from "./searchReducer";

export default combineReducers({
    app: appReducer,
    auth: authReducer,
    user: userReducer,
    search: searchReducer
})