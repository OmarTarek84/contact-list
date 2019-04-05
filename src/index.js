import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import ContactReducer from './store/reducers/Contact';
import AuthReducer from './store/reducers/Auth';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';

const rootReducer = combineReducers({
    contact: ContactReducer,
    auth: AuthReducer
});

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        };
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
