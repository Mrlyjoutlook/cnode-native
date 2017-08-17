import { all, fork } from 'redux-saga/effects';
import appTask from './appSaga';

export default function* rootSaga() {
  yield all([
    fork(appTask)
  ])
}
