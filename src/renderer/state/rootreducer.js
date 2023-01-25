import { combineReducers } from 'redux';
import lightReducer from './lightReducer.js';

const rootReducer = combineReducers({
  light: lightReducer,
});

export default rootReducer;
