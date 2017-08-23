import { fromJS, Map, List } from 'immutable';
import { REQUEST_LIST, CHANGE_TAB, REQUEST_TOPIC } from '../actions';

const initialState = fromJS({
  listInfo: {
    loading: false,
    page: 1,
    tab: 'all',
    limit: 10,
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
      return state.setIn(['listInfo', 'tab'], action.tab);
    case `${REQUEST_TOPIC}_OK`:
      return state.set('topic', Map(action.data));
    default:
      return state;
  }
};
