import React, { PureComponent } from 'react'
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import immutableTransform from 'redux-persist-transform-immutable';
import createStore from './redux/store';
import rootSaga from './redux/saga';
import App from './App';
import { View } from 'react-native';

// require('moment').locale('zh-cn');

// create store
const { store, run } = createStore();

// go saga
run(rootSaga);

// data persist
persistStore(store, {
  whitelist: ['userState'],
  storage: AsyncStorage,
  transforms: [immutableTransform()],
  keyPrefix: 'cnode'
});

export default class extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
};
