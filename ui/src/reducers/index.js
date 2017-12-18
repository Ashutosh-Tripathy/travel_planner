import { combineReducers } from 'redux';
import items from './itemReducer';
import users from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
const rootReducer = combineReducers({
    items,
    users,
    ajaxCallsInProgress
});

export default rootReducer;