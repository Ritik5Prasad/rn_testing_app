import { combineReducers } from 'redux';
import userSlice from './reducers/userSlice';

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
