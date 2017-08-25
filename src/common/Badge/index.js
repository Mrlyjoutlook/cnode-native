import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  content: {
    paddingBottom: 1,
    paddingTop: 1,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 5,
    backgroundColor: 'red',
    borderWidth: 0,
  },
  text: {
    color: '#fff',
    fontSize: 12
  }
});

class Badge extends PureComponent {

  static defaultProps = {
    text: 0,
    overflowCount: 10,
    customStyle: {}
  }

  render() {
    const { text, overflowCount, customStyle } = this.props;
    return (
      <View style={[styles.content, customStyle]}>
        <Text style={styles.text}>{text >= overflowCount ? `${overflowCount}+` : text}</Text>
      </View>
    );
  }
}

export default Badge;
