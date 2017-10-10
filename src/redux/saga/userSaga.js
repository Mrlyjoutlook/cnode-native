import { all, put, cancel, select, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  GET_USERINFO,
  SEND_MESSAGE,
  COLLECT_API_ERROR,
  COLLECT_APP_ERROR,
  REQUEST_MODAL_LOAD_STATR,
  REQUEST_MODAL_LOAD_STOP,
  goBack,
  SAVE_TOKEN,
  SIGN_IN,
  SIGN_OUT,
  checkToken,
  REQUEST_LOGIN,
  push,
  getUserInfo,
  getUserInfoCollect,
  REQUSET_USERINFO,
  REQUSET_USERINFO_COLLECT,
  CLEAR_USERINFO,
  getNoReadMessage,
  REQUEST_MESSAHE_NOREAD,
  REQUEST_MESSAHE_ALL,
} from '../actions';

function* watchLogin ({ data }) {
  try {
    yield put({ type: SAVE_TOKEN, data }); // save token
    yield put({ type: REQUEST_MODAL_LOAD_STATR });
    const result = yield put.resolve(checkToken(data));
    yield put({ type: REQUEST_MODAL_LOAD_STOP });
    if (result.success) {
      yield put({ type: `${REQUEST_LOGIN}_OK`, data: result });
      yield put(goBack());
    } else {
      yield put({ type: SEND_MESSAGE, content: result.error_msg });
    }
  } catch (e) {
    yield put({ type: COLLECT_API_ERROR, error: { message: e.message } });
  }
}

function* watchLoginOut () {
  yield put({ type: CLEAR_USERINFO });
  yield put(goBack());
}

function* watchUserInfo () {
  try {
    const user = yield select(state=>state.userState.get('info'));
    if (!user.get('score')) yield put({ type: REQUEST_MODAL_LOAD_STATR });
    const [ info, infoCollect ] = yield all([
      put.resolve(getUserInfo(user.get('loginname'))),
      put.resolve(getUserInfoCollect(user.get('loginname')))
    ]);
    yield put({ type: REQUEST_MODAL_LOAD_STOP });
    if (info.success || infoCollect.success) {
      if (info.success && infoCollect.success) {
        yield all([
          put({ type: `${REQUSET_USERINFO}_OK`, data: info.data }),
          put({ type: `${REQUSET_USERINFO_COLLECT}_OK`, data: infoCollect.data }),
        ]);
      } else {
        if (info.success || infoCollect.success) {
          yield put({ type: `${info.success ? REQUSET_USERINFO : REQUSET_USERINFO_COLLECT}_OK`, data: info.success ? info.data : infoCollect.data });
        }
      }
    } else {
      yield put({ type: SEND_MESSAGE, content: info.error_msg || infoCollect.error_msg });
    }
  } catch (e) {
    yield put({ type: COLLECT_API_ERROR, error: { message: e.message } });
  }
}

function* watchMessage () {
  try {
    const accesstoken = yield select(state=>state.userState.get('accesstoken'));
    if (accesstoken) {
      const { success, data } = yield put.resolve(getNoReadMessage());
      if (success) {
        yield put({ type: `${REQUEST_MESSAHE_NOREAD}_OK`, data });
      }
    }
  } catch (e) {
    console.log(e);
    yield put({ type: COLLECT_API_ERROR, error: { message: e.message } });
  }
}

export default function* userTask() {
  yield takeLatest(SIGN_IN, watchLogin);
  yield takeLatest(SIGN_OUT, watchLoginOut);
  yield takeLatest(GET_USERINFO, watchUserInfo);
  yield takeLatest([REQUEST_MESSAHE_NOREAD, REQUEST_MESSAHE_ALL], watchMessage);
}
