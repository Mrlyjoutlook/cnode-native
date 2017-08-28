import React, { PureComponent } from 'react'
import { Provider } from 'react-redux';
import createStore from './redux/store';
import rootSaga from './redux/saga';
import App from './App';
import { View } from 'react-native';

require('moment').locale('zh-cn');

// create store
const { store, run } = createStore();

// go saga
run(rootSaga);

export default class extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
};
