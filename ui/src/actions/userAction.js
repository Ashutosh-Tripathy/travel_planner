import * as types from './actionTypes';
import userApi from '../api/userApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import toastr from 'toastr';
import { ucs2 } from 'punycode';
// import { start } from 'repl';


export function loadUsersSuccess(users) {
    return { type: types.LOAD_USERS_SUCCESS, users };
}

export function loadUserSuccess(user) {
    return { type: types.LOAD_USER_SUCCESS, user };
}

export function deleteUserSuccess(users) {
    return { type: types.DELETE_USER_SUCCESS, users };
}

export function updateUserSuccess(users) {
    return { type: types.UPDATE_USER_SUCCESS, users };
}

export function createUserSuccess(users) {
    return { type: types.CREATE_USER_SUCCESS, users };
}


export function getUsers() {
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

//export function getUser(id) {
//    return function (dispatch, getState) {
//        var state = getState();
//        var url = "http://52.230.121.175/api/user/" + id;
//        dispatch(beginAjaxCall());
//        return fetch(url)
//            .then(function (result) {
//                if (result.status === 200) {
//                    return result.json();
//                }
//                throw "request failed";
//            })
//            .then(function (jsonResult) {
//                dispatch(loadUserSuccess(jsonResult));
//            })
//            .catch(function (err) {
//                dispatch(ajaxCallError());
//                throw (err);
//                // sweetAlert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
//            });
//    }
//}


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


export function saveUser(user) {
    return function (dispatch, getState) {
        var url = 'http://52.230.121.175/api/user';
        var state = getState();
        if (user.name.length < 1) {
            throw (`Title must be at least 1 characters.`);
        }
        dispatch(beginAjaxCall());
        if (user.id) {
            url += "/" + user.id;
            console.log(`Patch user: ${user.id}, url: ${url}, name: ${user.name}, password: ${user.password}, role: ${user.role}`);
            if (! user.password) delete user.password;
            return fetch(url, {
                method: "PATCH",
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
                    throw "request failed";
                })
                .then(function (jsonResult) {
                    let userIndex = state.users.findIndex((obj => obj.id == user.id));
                    let users = JSON.parse(JSON.stringify(state.users));
                    users[userIndex] = user;
                    dispatch(updateUserSuccess(users));
                    toastr.success('User updated successfuly');

                    // dispatch(deleteUserSuccess(jsonResult));
                })
                .catch(function (err) {
                    dispatch(ajaxCallError());
                    throw (err);
                    // sweetAlert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
                });
        } else {
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
                    throw "request failed";
                })
                .then(function (jsonResult) {
                    debugger;
		    let users = JSON.parse(JSON.stringify(state.users));
                    users.push(jsonResult);
                    dispatch(createUserSuccess(users));
                    toastr.success('Successfuly created user.');

                    // dispatch(deleteUserSuccess(jsonResult));
                })
                .catch(function (err) {
                    dispatch(ajaxCallError());
                    throw (err);
                    // sweetAlert("Oops...", "Couldn't fetch repos for user: " + state.user, "error");
                });
        }
    };
}
        // return function (dispatch) {
        //     dispatch(beginAjaxCall());
        //     return userApi.getAllUsers().then(users => {
        //         dispatch(loadUsersSuccess(users));
        //     }).catch(error => {
        //         throw (error);
        //     });
        // };
