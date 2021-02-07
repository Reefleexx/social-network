import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
);

const store = createStore(rootReducer, enhancer)

sagaMiddleware.run(rootSaga)

export default store