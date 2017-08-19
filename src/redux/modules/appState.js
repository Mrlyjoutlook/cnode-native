import { fromJS, Map } from 'immutable';
import { REQUEST_LIST, CHANGE_TAB } from '../actions';

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
});

export default function (state = initialState, action) {
  switch (action.type) {
    case `${REQUEST_LIST}_LOAD`:
      return state.setIn(['listInfo', 'loading'], true);
    case `${REQUEST_LIST}_OK`:
      return state.setIn(['listData', action.tab], fromJS(action.data))
        .setIn(['listInfo', 'loading'], false)
        .setIn(['listInfo', 'tab'], action.tab);
    case CHANGE_TAB:
      return state.setIn(['listInfo', 'tab'], action.tab);
    default:
      return state;
  }
};
