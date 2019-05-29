import { createStore, combineReducers, compose } from "redux";

// Reducers
import user from './reducers/user';
import favorites from './reducers/favorites';
import data from './reducers/data'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default createStore(combineReducers({ data, user, favorites }), composeEnhancers());
