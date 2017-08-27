import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';
import Home from './scene/Home';
import Admin from './scene/Admin';
import Topic from './scene/Topic';
import Login from './scene/Login';

const AppNavigator = StackNavigator({
  Home: { screen: Home },
  Admin: { screen: Admin },
  Topic: { path: 'topic/:id', screen: Topic },
  Login: { screen: Login }
}, {
  transitionConfig: () => {
    return ({
      // transitionSpec: {
      //   duration: 2000,
      //   easing: Easing.bounce,
      //   timing: Animated.timing,
      // },
      screenInterpolator: (sceneProps) => {
        const { scene: { route } } = sceneProps;
        const params = route.params || {};
        const transition = params.transition || 'forHorizontal';
        return CardStackStyleInterpolator[transition](sceneProps);
      },
    })
  }
});

export default AppNavigator;
