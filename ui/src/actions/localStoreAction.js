import * as types from './actionTypes';
import userApi from '../api/userApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import toastr from 'toastr';
import { ucs2 } from 'punycode';

var userInfo = {};

const getUserInfo = () => {
    if (!(userInfo && userInfo.token)) {
        try {
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!(userInfo && userInfo.token)) {
                return {};
            }
            return userInfo;
        } catch (err) {
            return undefined;
        }
    }
    return userInfo;
}


export const setUserInfo = (info) => {
    try {
        if (info.user) {
            info.user.isAdmin = info.user.role == 'admin';
            info.user.isManager = info.user.role == 'manager';
        }
        userInfo = info;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (err) {
        logger(1, err);
    }
}

export const getToken = () => {
    return getUserInfo().token;

}


export const getUser = () => {
    return getUserInfo().user;
}
