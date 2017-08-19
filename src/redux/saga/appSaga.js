import { put, select, takeLatest } from 'redux-saga/effects';
import { GET_LIST, REQUEST_LIST, getList, CHANGE_TAB } from '../actions';

function* watchList({ tab }) {
  // const curType = yield select(state => state.appState.getIn(['listInfo', 'type']));
  const listData = yield select(state => state.appState.get('listData'));
  if (true) {
    try {
      if (listData.get(tab).size === 0) yield put({ type: `${REQUEST_LIST}_LOAD` });
      const { success, data } = yield put.resolve(getList(tab));
      if (success) {
        yield put({ type: `${REQUEST_LIST}_OK`, data, tab });
      } else {
        yield put({ type: `${REQUEST_LIST}_FAIL`, data });
      }
    } catch (e) {
      // yield put({ type: `${REQUEST_LIST}_FAIL`, message: e.message });
    }
  }
}

function* watchTab(tab) {
  yield put({ type: CHANGE_TAB, tab });
}

export default function* appTask() {
  yield takeLatest(GET_LIST, watchList);
  // yield takeLatest(CHANGE_TAB, watchTab);
}
