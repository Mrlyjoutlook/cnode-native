import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

class Admin extends PureComponent {

  static navigationOptions = {
    title: 'Welcome world',
  };

  render() {
    return (
      <View>
        <Text>个人</Text>
      </View>
    );
  }
}

export default Admin;
