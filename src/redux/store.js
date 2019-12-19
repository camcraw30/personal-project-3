import {createStore, combineReducers, applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import commentReducer from './reducers/commentReducer';

const rootReducer = combineReducers({
    userReducer,
    postReducer,
    commentReducer
});

export default createStore(rootReducer, applyMiddleware(promise));