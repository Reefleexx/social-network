import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Layout from "./hoc/Layout";
import 'bootstrap/scss/bootstrap.scss'
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";
import store from "./redux/store";

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <Layout >
                <App/>
            </Layout>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
