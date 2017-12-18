import * as types from './actionTypes';
import itemApi from '../api/mockItemApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';


export function loadItemsSuccess(items) {
    return { type: types.LOAD_ITEMS_SUCCESS, items };
}

export function loadItems() {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return itemApi.getAllItems().then(items => {
            dispatch(loadItemsSuccess(items));
        }).catch(error => {
            logger(0, err);
            res.status(500).json({ message: 'Unsuccessful, Please try again.' });
        });
    };
}