import { combineReducers } from 'redux';
import users from './userReducer';
import trips from './tripReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
const rootReducer = combineReducers({
    users,
    trips,
    ajaxCallsInProgress
});

export default rootReducer;