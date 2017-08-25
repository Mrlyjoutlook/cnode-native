import { fromJS, Map, List } from 'immutable';
import { REQUEST_LIST, CHANGE_TAB, REQUEST_TOPIC } from '../actions';

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
    all: [],
    good: [],
    share: [],
    ask: [],
    job: [],
  },
  topic: {
    content: '',
    author: { loginname: '', avatar_url: '' },
    reply_count: '',
    visit_count: '',
    create_at: '',
    replies: []
  }
});

export default function (state = initialState, action) {
  switch (action.type) {
    case `${REQUEST_LIST}_LOAD`:
      return state.setIn(['listInfo', 'loading'], true);
    case `${REQUEST_LIST}_OK`:
      return state.setIn(['listData', action.tab], List(action.data))
        .setIn(['listInfo', 'loading'], false)
        .setIn(['listInfo', 'tab'], action.tab);
    case CHANGE_TAB:
      return state.setIn(['listInfo', 'base'], Map({ initialPage: action.initialPage, tab: action.tab }));
    case `${REQUEST_TOPIC}_OK`:
      return state.set('topic', Map(action.data));
    default:
      return state;
  }
};
