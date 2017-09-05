import { fromJS, Map } from 'immutable';
import {
  SAVE_TOKEN,
  REMEMBER_TOKEN,
  REQUEST_LOGIN,
  REQUSET_USERINFO,
} from '../actions';

const initialState = fromJS({
  rememberToken: false,
  accesstoken: '',  //3d926f56-bcee-4333-a18c-736a77638f49
  info: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
    case REMEMBER_TOKEN:
      return state.set('rememberToken', action.state);
    case SAVE_TOKEN:
      return state.set('accesstoken', action.data);
    case `${REQUEST_LOGIN}_OK`:
      return state.set('info', Map(action.data));
    case `${REQUSET_USERINFO}_OK`:
      return state.set('info', state.get('info').merge(action.data));
    default:
      return state;
  }
};
