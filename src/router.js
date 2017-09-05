import React from 'react';
import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import Home from './scene/Home';
import Admin from './scene/Admin';
import Topic from './scene/Topic';
import Login from './scene/Login';
import Ceshi from './scene/Ceshi';

const AppNavigator = StackNavigator({
  Home: { screen: Home },
  Admin: { screen: Admin },
  Topic: { path: 'topic/:id', screen: Topic },
  Login: { screen: Login },
  Ceshi: { screen: Ceshi }
}, {
  headerMode: 'screen',
  transitionConfig: () => {
    return ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene: { index, route } } = sceneProps;
        const params = route.params || {};
        const translateX = position.interpolate({
          inputRange: [index - 1 , index, index + 1],
          outputRange: [layout.initWidth, 0, 0]
        });
        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
          outputRange: [0, 1, 1, 0.3, 0]
        });
        return params.transition ? CardStackStyleInterpolator[ params.transition](sceneProps) : { opacity, transform: [{translateX}] }
      },
    })
  }
});

export default AppNavigator;
