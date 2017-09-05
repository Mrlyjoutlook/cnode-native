import { NavigationActions } from 'react-navigation';
import api from '../../config/api';

/**
|--------------------------------------------------
| action type
|--------------------------------------------------
*/

export const MODAL = 'MODAL';
export const COLLECT_APP_ERROR = 'COLLECT_APP_ERROR';
export const COLLECT_API_ERROR = 'COLLECT_API_ERROR';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
export const REQUEST_MODAL_LOAD_STATR = 'REQUEST_MODAL_LOAD_STATR';
export const REQUEST_MODAL_LOAD_STOP = 'REQUEST_MODAL_LOAD_STOP';
export const GET_LIST = 'GET_LIST';
export const REQUEST_LIST = 'REQUEST_LIST';
export const CHANGE_TAB = 'CHANGE_TAB';
export const GET_TOPIC = 'GET_TOPIC';
export const REQUEST_TOPIC = 'REQUEST_TOPIC';
export const REMEMBER_TOKEN = 'REMEMBER_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const CLOSEMODAL_PUSH = 'CLOSEMODAL_PUSH';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const CLEAR_USERINFO = 'CLEAR_USERINFO';
export const GET_USERINFO = 'GET_USERINFO';
export const REQUSET_USERINFO = 'REQUSET_USERINFO';

/**
|--------------------------------------------------
| create action
|--------------------------------------------------
*/

export const getList = (type = 'all') => (dispatch) => {
  return dispatch({
    type: REQUEST_LIST,
    url: api.getTopics,
    params: {
      page: 1,
      tab: type,
      limit: 10,
    },
  });
};

export const getTopic = (id) => (dispatch) => {
  return dispatch({
    type: REQUEST_TOPIC,
    url: api.getTopic(id),
  });
}

export const checkToken = (token) => (dispatch) => {
  return dispatch({
    type: REQUEST_LOGIN,
    method: "POST",
    url: api.accessToken,
    data: {
      accesstoken: token,
    }
  });
}

export const getUserInfo = (loginname) => (dispatch) => {
  return dispatch({
    type: REQUSET_USERINFO,
    url: api.getUserInfo(loginname)
  });
}

export const modal = (data) => ({
  type: MODAL, data
});

/**
|--------------------------------------------------
| 路由action
|--------------------------------------------------
*/

export const push = ({ name = '', params = {} }) =>  NavigationActions.navigate({
  routeName: name,
  params,
});

export const goBack = (key = null) => NavigationActions.back({ key });
