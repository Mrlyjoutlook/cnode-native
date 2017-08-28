import { fromJS, Map } from 'immutable';
// import * as actions from '../actions/userState';

const initialState = fromJS({
  accesstoken: '3d926f56-bcee-4333-a18c-736a77638f49',
  info: {},
});

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
};
