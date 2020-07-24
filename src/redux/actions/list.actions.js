import * as AT from '../action.types';
import {values} from 'lodash';

export const fetchLists = payload => ({
	type: AT.FETCH_LISTS,
	payload
});

export const setLists = payload => ({
	type: AT.FETCH_LISTS_SUCCESS,
	payload: values(payload)
});

export const updateListData = payload => ({
	type: AT.UPDATE_LIST_DATA,
	payload
});

export const addNewListForUser = payload => ({
	type: AT.ADD_NEWLIST_FOR_USER,
	payload
});

export const deleteListByUser = payload => ({
	type: AT.DELETE_LIST_BY_USER,
	payload
});
