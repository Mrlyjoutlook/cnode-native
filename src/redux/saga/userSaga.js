import { all, put, cancel, select, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  SEND_MESSAGE,
  COLLECT_API_ERROR,
  COLLECT_APP_ERROR,
  REQUEST_MODAL_LOAD_STATR,
  REQUEST_MODAL_LOAD_STOP,
  goBack,
  SAVE_TOKEN,
  SIGN_IN,
  checkToken,
  REQUEST_LOGIN,
  push
} from '../actions';

function* watchLogin({ data }) {
  try {
    yield put({ type: SAVE_TOKEN, data }); // save token
    yield put({ type: REQUEST_MODAL_LOAD_STATR });
    const result = yield put.resolve(checkToken(data));
    yield put({ type: REQUEST_MODAL_LOAD_STOP });
    if (result.success) {
      yield put({ type: `${REQUEST_LOGIN}_OK`, data: result });
      yield put(goBack());
    } else {
      // yield put({ type: `${REQUEST_LOGIN}_FAIL` });
      yield put({ type: SEND_MESSAGE, content: result.error_msg });
    }
  } catch (e) {
    yield put({ type: COLLECT_API_ERROR, error: { message: e.message } });
  }
}

export default function* userTask() {
  yield takeLatest(SIGN_IN, watchLogin);
}
