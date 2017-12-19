import * as types from './actionTypes';
import userApi from '../api/userApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import toastr from 'toastr';


export function loadUsersSuccess(users) {
    return { type: types.LOAD_USERS_SUCCESS, users };
}


export function deleteUserSuccess(users) {
    return { type: types.DELETE_USER_SUCCESS, users };
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
    }
}

export function deleteUser(id, users) {
    //    let id = event.target.id;
    // this.state.dispatch(deleteUser(id));

    return function (dispatch, getState) {
        var state = getState();
        var url = 'http://52.230.121.175/api/user/' + id;
        dispatch(beginAjaxCall());
        return fetch(url, {
            method: "DELETE",
        })
            .then(function (result) {
                if (result.status === 200) {
                    return result.json();
                }
                throw "request failed";
            })
            .then(function (jsonResult) {
                debugger;
                dispatch(deleteUserSuccess(state.users.filter(user => user.id != id)));
                toastr.success('User deleted successfuly');

                // dispatch(deleteUserSuccess(jsonResult));
            })
            .catch(function (err) {
                dispatch(ajaxCallError());
                throw (err);
                // sweetAlert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
            });
    }
}
        // return function (dispatch) {
        //     dispatch(beginAjaxCall());
        //     return userApi.getAllUsers().then(users => {
        //         dispatch(loadUsersSuccess(users));
        //     }).catch(error => {
        //         throw (error);
        //     });
        // };
