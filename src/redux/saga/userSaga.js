import { all, put, select, takeLatest } from 'redux-saga/effects';
import {
  COLLECT_APP_ERROR,
  REQUEST_MODAL_LOAD_STATR,
  REQUEST_MODAL_LOAD_STOP,
  goBack,
  SAVE_TOKEN,
  SIGN_IN,
  checkToken,
  REQUEST_LOGIN,
} from '../actions';

function* watchLogin({ data }) {
  try {
    yield put({ type: SAVE_TOKEN, data }); // save token
    yield put({ type: REQUEST_MODAL_LOAD_STATR })
    const result = yield put.resolve(checkToken(data));
    if (result.success) {
      yield all({
        load: put({ type: REQUEST_MODAL_LOAD_STOP }),
        result: put({ type: `${REQUEST_LOGIN}_OK`, data: result }),
      })
      yield put(goBack());
    } else {
      yield put({ type: `${REQUEST_LOGIN}_FAIL` });
    }
  } catch (e) {
    yield put({ type: `${REQUEST_LOGIN}_FAIL`, message: e.message });
  }
}

export default function* userTask() {
  yield takeLatest(SIGN_IN, watchLogin);
}
