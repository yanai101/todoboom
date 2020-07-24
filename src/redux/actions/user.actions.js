import * as AT from '../action.types';

export const setUser = user => ({
	type: AT.SET_USER,
	payload: {
		user
	}
});

export const setUserData = userData => ({
	type: AT.SET_USER_DATA,
	payload: userData
});

export const setMiniUsers = miniUsers => ({
	type: AT.SET_MINI_USERS,
	payload: {
		miniUsers
	}
});

export const setCurrentMiniUser = miniUser => ({
	type: AT.SET_CURRENT_MINI_USER,
	payload: miniUser
});

export const deleteMiniUser = (miniUser,callback) => ({
	type: AT.DELETE_CURRENT_MINI_USER,
	payload: miniUser,
	callback
});

export const addMiniUser = (miniUser,callback) => ({
	type: AT.ADD_MINI_USER,
	payload: miniUser,
	callback
});

export const updateMiniUser = (miniUser,callback) => ({
	type: AT.UPDATE_MINI_USER,
	payload: miniUser,
	callback
});
export const getUserStats = (user,callback) => ({
	type: AT.GET_USER_STATS,
	payload: {user,callback}
});

export const authenticate = payload => ({
	type: AT.AUTHENTICATE,
	payload
});

export const logout = () => ({
	type: AT.LOGOUT
});
