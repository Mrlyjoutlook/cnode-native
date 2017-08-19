import { StackNavigator } from 'react-navigation';
import Home from './scene/Home';
import Admin from './scene/Admin';
import Topic from './scene/Topic';

const AppNavigator = StackNavigator({
  Home: { screen: Home },
  Admin: { screen: Admin },
  Topic: {
    path: 'topic/:id',
    screen: Topic,
  }
});

export default AppNavigator;
