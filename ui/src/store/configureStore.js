import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

function thunkMiddleware({ dispatch, getState }) {
    return next => action =>
        typeof action === 'function' ?
            action(dispatch, getState) :
            next(action);
}

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, reduxImmutableStateInvariant())
    );
}