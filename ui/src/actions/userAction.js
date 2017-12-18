import * as types from './actionTypes';
import userApi from '../api/userApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';


export function loadUsersSuccess(users) {
    return { type: types.LOAD_USERS_SUCCESS, users };
}

export function loadUsers() {
    return function (dispatch, getState) {
        var state = getState();
        var url = "http://52.230.121.175/api/users";
        dispatch(beginAjaxCall());
        return fetch(url)
            .then(function (result) {
                if (result.status === 200) {
                    return result.json();
                }
                throw "request failed";
            })
            .then(function (jsonResult) {
                dispatch(loadUsersSuccess(jsonResult));
            })
            .catch(function (err) {
                dispatch(ajaxCallError());
                throw (err);
                // sweetAlert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
            });


        // return function (dispatch) {
        //     dispatch(beginAjaxCall());
        //     return userApi.getAllUsers().then(users => {
        //         dispatch(loadUsersSuccess(users));
        //     }).catch(error => {
        //         throw (error);
        //     });
        // };
    }
}
