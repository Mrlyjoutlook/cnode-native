import { fromJS, Map, List } from 'immutable';
import { normalize, schema } from 'normalizr';
import moment from 'moment';
import {
  MODAL,
  SEND_MESSAGE,
  CLOSE_MESSAGE,
  COLLECT_APP_ERROR,
  COLLECT_API_ERROR,
  REQUEST_MODAL_LOAD_STATR,
  REQUEST_MODAL_LOAD_STOP,
  REQUEST_LIST,
  CHANGE_TAB,
  REQUEST_TOPIC,
  REQUSET_COLLECT_TOPIC,
  REQUSET_DECOLLECT_TOPIC,
} from '../actions';

const initialState = fromJS({
  listInfo: {
    base: { initialPage: 0, tab: 'all' },
    all: { page: 1, limit: 10, loading: false, },
    good: { page: 1, limit: 10, loading: false, },
    share: { page: 1, limit: 10, loading: false, },
    ask: { page: 1, limit: 10, loading: false, },
    job: { page: 1, limit: 10, loading: false, },
  },
  listData: {
    all: { id: [], data: {} },
    good: { id: [], data: {} },
    share: { id: [], data: {} },
    ask: { id: [], data: {} },
    job: { id: [], data: {} },
  },
  topics: {
    id: [],
    data: {}
  },
  requestLoad: false,
  error: {
    appErrorId: [],
    apiErrorId: [],
    data: {}
  },
  message: {
    title: '',
    content: '',
    btn: []
  },
  modal: {
    open: false,
    type: '', // collect, recent_replies, recent_topics
    title: '',
  }
});

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
    case CLOSE_MESSAGE:
      return state.set('message', Map({
        title: action.type === SEND_MESSAGE ? action.title : '',
        content: action.type === SEND_MESSAGE ? action.content : '',
        btn: action.type === SEND_MESSAGE ? action.btn : []
      }));
    case COLLECT_APP_ERROR:
    case COLLECT_API_ERROR:
      const i = state.getIn(['error', 'appErrorId']).size + state.getIn(['error', 'apiErrorId']).size;
      const item = action.type === COLLECT_APP_ERROR ? 'appErrorId' : 'apiErrorId';
      return state.update(
        'error',
        data => data.set(item, data.get(item).push(i))
          .set('data', data.get('data').merge({ [i]: action.error }))
          .set('order', i)
      ).set('requestLoad', false)
      .set('message', Map({
        title: '提示',
        content: action.type === COLLECT_APP_ERROR ? '程序异常' : '网络异常',
        btn: action.btn
      }));
    case REQUEST_MODAL_LOAD_STATR:
    case REQUEST_MODAL_LOAD_STOP:
      return state.set('requestLoad', action.type === REQUEST_MODAL_LOAD_STATR ? true : false);
    case MODAL:
      const { open, type, title } = action.data;
      return state.set('modal', Map({ open, type, title }))
    case `${REQUEST_LIST}_LOAD`:
      return state.setIn(['listInfo', 'loading'], true);
    case `${REQUEST_LIST}_OK`:
      const { data, tab } = action;
      const topicSchema = new schema.Entity('topics');
      const topicsSchema = [ topicSchema ];
      const normalizedData = normalize(data, topicsSchema);
      return state.setIn(['listData', tab], Map({
        id: normalizedData.result,
        data: Map(normalizedData.entities.topics)
      }))
        .setIn(['listInfo', 'loading'], false)
        .setIn(['listInfo', 'tab'], tab);
    case CHANGE_TAB:
      return state.setIn(['listInfo', 'base'], Map({ initialPage: action.initialPage, tab: action.tab }));
    case `${REQUEST_TOPIC}_OK`:
      const { last_reply_at } = action.data;
      if (!moment(state.getIn(['listData', action.tab, 'data', action.id])).isSame(last_reply_at) ||
      !state.getIn(['listData', action.tab, 'data', action.id])['replies'] ||
      !state.getIn(['listData', action.tab, 'data', action.id])['is_collect']
      ) {
        return state.setIn(['listData', action.tab, 'data', action.id], action.data);
      }
      return state;
    case `${REQUSET_COLLECT_TOPIC}_OK`:
    case `${REQUSET_DECOLLECT_TOPIC}_OK`:
      let d = state.getIn(['listData', action.tab, 'data', action.id]);
      d.is_collect = action.type === `${REQUSET_COLLECT_TOPIC}_OK` ? true :false;
      return state.setIn(['listData', action.tab, 'data', action.id], d);
    default:
      return state;
  }
};
