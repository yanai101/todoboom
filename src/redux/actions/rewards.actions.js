import * as AT from '../action.types';
import {values} from 'lodash';

export const fetchRewards = payload => ({
	type: AT.FETCH_REWARDS,
	payload
});

export const setRewards = payload => ({
	type: AT.FETCH_REWARDS_SUCCESS,
	payload: values(payload)
});

export const updateRewardData = payload => ({
	type: AT.UPDATE_REWARD_DATA,
	payload
});
