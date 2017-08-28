import { NavigationActions } from 'react-navigation';
import api from '../../config/api';

/**
|--------------------------------------------------
| action type
|--------------------------------------------------
*/

export const GET_LIST = 'GET_LIST';
export const REQUEST_LIST = 'REQUEST_LIST';
export const CHANGE_TAB = 'CHANGE_TAB';
export const GET_TOPIC = 'GET_TOPIC';
export const REQUEST_TOPIC = 'REQUEST_TOPIC';
// export const REQUEST_LIST = 'REQUEST_LIST';

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
