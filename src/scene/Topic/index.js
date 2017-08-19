import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';
import theme from '../../config/styles';

class Topic extends PureComponent {

  static navigationOptions = {
    title: '详情',
    headerStyle: {
      backgroundColor: theme.backgroundColor,
      borderWidth: 0,
    }
  };

  render() {
    const { navigation, htmlContent } = this.props;
    console.log(navigation)
    return (
      <View>
        <HTMLView
          value={htmlContent}
        />
      </View>
    );
  }
}

export default Topic;
