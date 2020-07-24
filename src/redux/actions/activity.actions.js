import * as AT from '../action.types';
import {values} from 'lodash';

export const addActivity = (activity,callback) => ({
	type: AT.ADD_ACTIVITY,
	payload: activity,callback
});

export const getActivityBySubject = payload => ({
	type: AT.GET_ACTIVITY_BY_SUBJECT,
	payload
});

export const fetchActivities = payload => ({
	type: AT.FETCH_ACTIVITIES,
	payload
});


export const setActivities = payload => ({
	type: AT.FETCH_ACTIVITIES_SUCCESS,
	payload: values(payload)
});

export const getActivityByID = payload => ({
	type: AT.GET_ACTIVITY_BY_ID,
	payload
});

export const setOptionalActivities = payload => ({
	type: AT.SET_OPTIONAL_ACTIVITIES,
	payload: values(payload)
});

export const updateActivity = payload => ({
	type: AT.CURRENT_USER_RESULTS,
	payload: values(payload)
});


export const editACTIVITY = ({activity, callback}) => ({
	type: AT.EDIT_ACTIVITY_BY_ID,
	payload: {activity, callback}
});
