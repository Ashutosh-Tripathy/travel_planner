import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
    switch (action.type) {
        case types.LOAD_USERS_SUCCESS:
            return action.users;

        case types.LOAD_USER_SUCCESS:
            return action.user;

        case types.DELETE_USER_SUCCESS:
            return action.users;

        case types.UPDATE_USER_SUCCESS:
            return action.users;

        case types.CREATE_USER_SUCCESS:
            return action.users;



        default:
            return state;
    }
}
