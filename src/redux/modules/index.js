import { combineReducers } from 'redux';
import userState from '../modules/userState';
import appState from '../modules/appState';

export default combineReducers({
  userState: userState,
  appState: appState
});
