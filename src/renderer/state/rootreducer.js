import { combineReducers } from 'redux';
import lightSlice from './lightSlice';
import requestSlice from './requestSlice';

const rootReducer = combineReducers({
  light: lightSlice,
  request : requestSlice,
});

export default rootReducer;
