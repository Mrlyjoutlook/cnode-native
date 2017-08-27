import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mask: {
    width,
    height,
    opacity: .5,
    backgroundColor: '#000',
    // position:"absolute",
  },
  content: {
    width,
    height,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fff',
    marginTop: 24
  }
});

class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  state = {  }
  render() {
    return (
      <View style={styles.mask}>
        <View style={styles.content}>
        </View>
      </View>
    );
  }
}

export default Login;
