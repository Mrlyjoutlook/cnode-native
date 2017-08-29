import React, { Component } from 'react';
import { Animated, Easing, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  icon: {
    color: '#666'
  }
})

class AnimateIcon extends Component {

  state = {}

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
        duration: 1500,
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
      <Animated.View style={{ transform: [{rotate: spin}] }}>
        <Icon name="spinner" size={40} style={styles.icon}/>
      </Animated.View>
    );
  }
}

export default AnimateIcon;
