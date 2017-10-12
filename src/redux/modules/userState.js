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
    data: [
      {
        "id": "59dde34ef7cc61fb67daaf69",
        "type": "at",
        "has_read": true,
        "author": {
          "loginname": "mumudev",
          "avatar_url": "https://avatars3.githubusercontent.com/u/16707612?v=4&s=120"
        },
        "topic": {
          "id": "59ddb75661932717683d221f",
          "title": "基于阿里的Node全栈之路",
          "last_reply_at": "2017-10-11T09:24:30.460Z"
        },
        "reply": {
          "id": "59dde34ef7cc61fb67daaf68",
          "content": "<div class=\"markdown-text\"><p><a href=\"/user/Mrlyjoutlook\">@Mrlyjoutlook</a> <a href=\"/user/Yhaojing\">@Yhaojing</a> 谢谢支持，如果能提点意见最好啦，正在准备下一篇文章</p>\n</div>",
          "ups": [],
          "create_at": "2017-10-11T09:24:30.447Z"
        },
        "create_at": "2017-10-11T09:24:30.475Z"
      }, {
        "id": "59dde34ef7cc61fb67daaf69",
        "type": "at",
        "has_read": true,
        "author": {
          "loginname": "mumudev",
          "avatar_url": "https://avatars3.githubusercontent.com/u/16707612?v=4&s=120"
        },
        "topic": {
          "id": "59ddb75661932717683d221f",
          "title": "基于阿里的Node全栈之路",
          "last_reply_at": "2017-10-11T09:24:30.460Z"
        },
        "reply": {
          "id": "59dde34ef7cc61fb67daaf68",
          "content": "<div class=\"markdown-text\"><p><a href=\"/user/Mrlyjoutlook\">@Mrlyjoutlook</a> <a href=\"/user/Yhaojing\">@Yhaojing</a> 谢谢支持，如果能提点意见最好啦，正在准备下一篇文章</p>\n</div>",
          "ups": [],
          "create_at": "2017-10-11T09:24:30.447Z"
        },
        "create_at": "2017-10-11T09:24:30.475Z"
      },
      {
        "id": "59dde34ef7cc61fb67daaf69",
        "type": "at",
        "has_read": true,
        "author": {
          "loginname": "mumudev",
          "avatar_url": "https://avatars3.githubusercontent.com/u/16707612?v=4&s=120"
        },
        "topic": {
          "id": "59ddb75661932717683d221f",
          "title": "基于阿里的Node全栈之路",
          "last_reply_at": "2017-10-11T09:24:30.460Z"
        },
        "reply": {
          "id": "59dde34ef7cc61fb67daaf68",
          "content": "<div class=\"markdown-text\"><p><a href=\"/user/Mrlyjoutlook\">@Mrlyjoutlook</a> <a href=\"/user/Yhaojing\">@Yhaojing</a> 谢谢支持，如果能提点意见最好啦，正在准备下一篇文章</p>\n</div>",
          "ups": [],
          "create_at": "2017-10-11T09:24:30.447Z"
        },
        "create_at": "2017-10-11T09:24:30.475Z"
      },
    ],
  },
  readMessages: {
    count: 0,
    data: [
      {
        "id": "59dde34ef7cc61fb67daaf69",
        "type": "at",
        "has_read": true,
        "author": {
          "loginname": "mumudev",
          "avatar_url": "https://avatars3.githubusercontent.com/u/16707612?v=4&s=120"
        },
        "topic": {
          "id": "59ddb75661932717683d221f",
          "title": "基于阿里的Node全栈之路",
          "last_reply_at": "2017-10-11T09:24:30.460Z"
        },
        "reply": {
          "id": "59dde34ef7cc61fb67daaf68",
          "content": "<div class=\"markdown-text\"><p><a href=\"/user/Mrlyjoutlook\">@Mrlyjoutlook</a> <a href=\"/user/Yhaojing\">@Yhaojing</a> 谢谢支持，如果能提点意见最好啦，正在准备下一篇文章</p>\n</div>",
          "ups": [],
          "create_at": "2017-10-11T09:24:30.447Z"
        },
        "create_at": "2017-10-11T09:24:30.475Z"
      },
      {
        "id": "59dde34ef7cc61fb67daaf69",
        "type": "at",
        "has_read": true,
        "author": {
          "loginname": "mumudev",
          "avatar_url": "https://avatars3.githubusercontent.com/u/16707612?v=4&s=120"
        },
        "topic": {
          "id": "59ddb75661932717683d221f",
          "title": "基于阿里的Node全栈之路",
          "last_reply_at": "2017-10-11T09:24:30.460Z"
        },
        "reply": {
          "id": "59dde34ef7cc61fb67daaf68",
          "content": "<div class=\"markdown-text\"><p><a href=\"/user/Mrlyjoutlook\">@Mrlyjoutlook</a> <a href=\"/user/Yhaojing\">@Yhaojing</a> 谢谢支持，如果能提点意见最好啦，正在准备下一篇文章</p>\n</div>",
          "ups": [],
          "create_at": "2017-10-11T09:24:30.447Z"
        },
        "create_at": "2017-10-11T09:24:30.475Z"
      },
    ],
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
