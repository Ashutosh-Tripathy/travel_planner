import * as types from './actionTypes';
import userApi from '../api/userApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import toastr from 'toastr';
import { ucs2 } from 'punycode';


export const getToken = () => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			return undefined;
		}
		return token;
	} catch (err) {
		return undefined;
	}

}

export const setToken = (token) => {
	try {
		localStorage.setItem('token', token);
	} catch (err) {
		logger(1, err);
	}
}
