import * as AT from '../action.types';

const INITIAL_STATE = [];

const listsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case AT.FETCH_LISTS_SUCCESS:
			const lists = action.payload;
			return lists;
		default:
			return state;
	}
};

export default listsReducer;
