import { createStore, applyMiddleware } from 'redux';
//import { syncHistoryWithStore } from 'react-router-redux';
//import { browserHistory } from 'react-router';
import rootReducer from './reducers.jsx';
import thunk from 'redux-thunk';
//import customMiddleware from './middleware.jsx'

export default function configureStore(initialState) {
    let middleware = [
        thunk,
        //customMiddleware
    ];

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    )
}