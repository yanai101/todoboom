import * as AT from '../action.types';

const INITIAL_STATE = null;

const rewardsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AT.FETCH_REWARDS_SUCCESS:
			const rewards = action.payload;
			return rewards;
		default:
			return state;
	}
};

export default rewardsReducer;
