import { combineReducers } from 'redux';
import lightSlice from './lightSlice';
import currentReqRes from './currentReqRes';
import historyReqRes from './historyReqRes';


const rootReducer = combineReducers({
  light: lightSlice,
  currentReqRes: currentReqRes,
  historyReqRes: historyReqRes,

});

export default rootReducer;
