import { combineReducers } from 'redux';
import lightSlice from './lightSlice';
import requestSlice from './requestSlice';
import existingReqSlice from './existingReqRes';

const rootReducer = combineReducers({
  light: lightSlice,
  request : requestSlice,
  existingReqRes: existingReqSlice,
});

export default rootReducer;
