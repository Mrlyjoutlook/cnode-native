import React, { PureComponent } from 'react'
import { StatusBar, View } from 'react-native'
import { StackNavigator } from 'react-navigation';
import Home from './scene/Home';
import Admin from './scene/Admin';
import Topic from './scene/Topic';

require('moment').locale('zh-cn');

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
      <Navigator/>
    )
  }
};

export default Root;
