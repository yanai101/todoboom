import * as AT from '../action.types';
import firebaseManager from '../../services/firebaseManager';

import {setUser, setMiniUsers} from "../actions/user.actions";
import {setActivities} from "../actions/activity.actions";
import {fetchLists,setLists} from "../actions/list.actions";
import {fetchRewards,setRewards} from "../actions/rewards.actions";

const firebase = new firebaseManager();
const firebaseMiddleware = store => {
	const onSuccess = user => {
		store.dispatch(setUser(user));
		if(user.uid){

			console.log(`user is authenticated user.uid: ${user.uid}, user.email:${user.email}`)
		}
			else {
			}
	}

	const refreshMiniUsers = action =>{firebase.orderByChild(`/miniUsers/${action.payload.uid}`, "active", true, data =>{store.dispatch(setMiniUsers(data));action.callback()});}



	firebase.onAuth(onSuccess);

	return next => action => {
		switch (action.type) {
			case AT.LOGOUT:
				firebase.logout();
				break;

			case AT.AUTHENTICATE:
				const onSuccess = user => store.dispatch(setUser(user));

				firebase.authenticate({
					...action.payload, onSuccess, onError: () => {
					}
				});
				break;
			case AT.ADD_ACTIVITY:
			  firebase.pushKey('/activities/',action.payload.subject, action.payload,action.callback);
				break;
			case AT.FETCH_ACTIVITIES:
				  firebase.get(`/activities`, data => {store.dispatch(setActivities(data))});
					break;
			case AT.FETCH_LISTS:
				  firebase.get(`/lists/${action.payload.uid}`, data => {store.dispatch(setLists(data))});
					break;
			case AT.UPLOAD_FILE:
			  firebase.uploadImage(action.payload);
				break;
			case AT.ADD_NEWLIST_FOR_USER:
				  firebase.pushKey(`/lists/${action.payload.user.uid}/`,null , action.payload.data, data => {store.dispatch(fetchLists(action.payload.user))});
					break;
			case AT.UPDATE_LIST_DATA:
				  firebase.set(`/lists/${action.payload.user.uid}/${action.payload.data.id}`,action.payload.data ,data => {store.dispatch(fetchLists(action.payload.user))});
					break;
			case AT.DELETE_LIST_BY_USER:
				  firebase.remove(`/lists/${action.payload.user.uid}/${action.payload.currentListID}`);
					store.dispatch(fetchLists(action.payload.user));
					break;
			case AT.FETCH_REWARDS:
				  firebase.get(`/rewards/${action.payload.uid}`, data => {store.dispatch(setRewards(data))});
					break;
			case AT.UPDATE_REWARD_DATA:
				  firebase.set(`/rewards/${action.payload.user.uid}`,action.payload.data ,data => {store.dispatch(fetchRewards(action.payload.user))});
					break;
			case AT.CHECK_FILE:
			  firebase.checkFile(action.payload);
				break;
			case AT.ADD_MINI_USER:
			  firebase.push('/miniUsers/',action.payload.uid, action.payload,refreshMiniUsers(action));
				break;
			case AT.UPDATE_MINI_USER:
			  //const refreshMiniUsers = () =>{firebase.get(`/miniUsers/${action.payload.uid}`, data =>{store.dispatch(setMiniUsers(data));action.callback()});}
				firebase.set(`/miniUsers/${action.payload.uid}/${action.payload.id}`, action.payload,refreshMiniUsers(action));
				break;
			case AT.DELETE_CURRENT_MINI_USER:
				firebase.set(`/miniUsers/${action.payload.uid}/${action.payload.id}/active`,false, refreshMiniUsers(action));
				break;
			default:
				break;
		}

		return next(action);
	};
};

export default firebaseMiddleware;
