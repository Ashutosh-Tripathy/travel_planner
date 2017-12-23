import * as types from './actionTypes';
import userApi from '../api/userApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import toastr from 'toastr';
import { ucs2 } from 'punycode';
import { getUser, setUserInfo } from './localStoreAction';


export function loadUsersSuccess(users) {
    return { type: types.LOAD_USERS_SUCCESS, users };
}

export function authenticateUser(user) {
    return function (dispatch, getState) {
        var url = 'http://52.230.121.175/api/authenticate';
        var state = getState();
        if (user.username.length < 1) {
            throw (`Please enter username.`);
        }
        if (user.password.length < 1) {
            throw (`Please enter password.`);
        }
        //        dispatch(beginAjaxCall());
        //Just simulating creation here.
        //The server would generate ids and watchHref's for new users in a real app.
        //Cloning so copy returned is passed by value rather than by reference.
        //	    console.log(`Post user: ${id}, url: ${url}, name: ${name}, password: ${textpassword}, role: ${role}`);

        return fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(function (result) {
                if (result.status === 200) {
                    return result.json();
                }
                if (result.status === 400) {
                    throw 'Invalid username/password';
                }

                throw "request failed";
            })
            .then(function (jsonResult) {
                //toastr.success(JSON.stringify(jsonResult));
                setUserInfo(jsonResult);

                // dispatch(deleteUserSuccess(jsonResult));
            })
            .catch(function (err) {
                //                  dispatch(ajaxCallError());
                throw (err);
                // sweetAlert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
            });
    };
}
