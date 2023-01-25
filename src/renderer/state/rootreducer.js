import { combineReducers } from 'redux';
import lightSlice from './lightSlice';

const rootReducer = combineReducers({
  light: lightSlice,
});

export default rootReducer;
