import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import theme from '../../config/styles';

class Admin extends PureComponent {

  static navigationOptions = {
    title: '详情',
    headerStyle: {
      backgroundColor: theme.backgroundColor,
      borderWidth: 0,
    }
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
