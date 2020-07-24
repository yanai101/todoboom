import {combineReducers} from "redux";

// reducers
import user from './user.reducer';
import activities from './activities.reducer';
import lists from './lists.reducer';
import rewards from './rewards.reducer';

export default combineReducers({
	user,
	activities,
	lists,
	rewards
});
