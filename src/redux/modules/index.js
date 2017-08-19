import { combineReducers } from 'redux';
import userState from '../modules/userState';
import appState from '../modules/appState';
import routerState from '../modules/routerState';

export default combineReducers({
  userState,
  appState,
  routerState,
});
