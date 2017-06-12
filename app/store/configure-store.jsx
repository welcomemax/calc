import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers.jsx';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    let middleware = [
        thunk
    ];

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    )
}