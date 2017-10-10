import { fromJS, Map } from 'immutable';
import {
  SAVE_TOKEN,
  REMEMBER_TOKEN,
  REQUEST_LOGIN,
  REQUSET_USERINFO,
  CLEAR_USERINFO,
  REQUSET_USERINFO_COLLECT,
  REQUEST_MESSAHE_NOREAD
} from '../actions';

const initialState = fromJS({
  rememberToken: false,
  accesstoken: '3d926f56-bcee-4333-a18c-736a77638f49',  //3d926f56-bcee-4333-a18c-736a77638f49
  info: {},
  noReadMessages: {
    count: 0,
    data: [],
  },
  readMessages: {
    count: 0,
    data: [],
  }
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
    case `${REQUSET_USERINFO_COLLECT}_OK`:
      return state.set('info', state.get('info').merge({ collect: action.data }));
    case CLEAR_USERINFO:
      return fromJS({
        rememberToken: false,
        accesstoken: '',
        info: {},
      });
    case REQUEST_MESSAHE_NOREAD:
      return state.update('noReadMessages', data => data.set('count', action.data));
    default:
      return state;
  }
};
