import * as AT from '../action.types';

const INITIAL_STATE = [];

const activitiesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AT.FETCH_ACTIVITIES_SUCCESS:
			const activities = action.payload;
			return activities;
		default:
			return state;
	}
};

export default activitiesReducer;
