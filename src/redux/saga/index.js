import { all, fork } from 'redux-saga/effects';
import appTask from './appSaga';
import userTask from './userSaga';

export default function* rootSaga() {
  yield all([
    fork(appTask),
    fork(userTask),
  ])
}
