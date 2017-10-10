import { put, select, takeLatest } from 'redux-saga/effects';
import {
  GET_LIST,
  REQUEST_LIST,
  getList,
  CHANGE_TAB,
  GET_TOPIC,
  REQUEST_TOPIC,
  getTopic,
  modal,
  CLOSEMODAL_PUSH,
  push,
  COLLECT_API_ERROR,
} from '../actions';

function* watchList({ tab }) {
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
      yield put({ type: COLLECT_API_ERROR, error: { message: e.message } });
    }
  }
}

function* watchTopic({id, tab}) {
  try {
    const { success, data } = yield put.resolve(getTopic(id));
    if (success) {
      yield put({ type: `${REQUEST_TOPIC}_OK`, data, id, tab });
    } else {
      yield put({ type: `${REQUEST_TOPIC}_FAIL`, data });
    }
  } catch (e) {
      yield put({ type: `${REQUEST_TOPIC}_FAIL`, message: e.message });
  }
}

function* watchTab(tab) {
  yield put({ type: CHANGE_TAB, tab });
}

function* closeModalpush({ id }) {
  yield put(modal({type: '', title: '', open: false}));
  if (id) yield put(push({ name: 'Topic', params: { id } }));
}

export default function* appTask() {
  yield takeLatest(GET_LIST, watchList);
  yield takeLatest(GET_TOPIC, watchTopic);
  yield takeLatest(CLOSEMODAL_PUSH, closeModalpush);
}
