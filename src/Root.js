import React, { PureComponent } from 'react'
import { StatusBar, View } from 'react-native'
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import Home from './scene/Home';
import Admin from './scene/Admin';
import Topic from './scene/Topic';
import createStore from './redux/store';
import rootSaga from './redux/saga';

require('moment').locale('zh-cn');

// create store
const { store, run } = createStore();

// go saga
run(rootSaga);

const Navigator = StackNavigator(
  {
    Home: { screen: Home },
    Admin: { screen: Admin }
  }, {
    Topic: {
      screen: Topic,
    }
  }
);

class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Navigator/>
      </Provider>
    )
  }
};

export default Root;
