import React, { Component } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  content: {
    alignItems: 'center'
  },
  article: {
    borderRadius: 500,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 20
  }
});

class Refresh extends Component {

  state = {  }

  spinValue = new Animated.Value(0)

  componentDidMount() {
    this.spin();
  }

  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(()=>this.spin());
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={styles.content}>
        <View style={styles.article}>
          <Animated.View style={{ transform: [{rotate: spin}] }}>
            <Icon name="ios-refresh" size={30} style={{color: '#00bcd4'}}/>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default Refresh;
