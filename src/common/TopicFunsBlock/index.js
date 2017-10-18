import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
});

class TopicFunsBlock extends Component {
  render() {
    const { name, imageSrc, reply, visit, time } = this.props;
    return (
      <View style={styles.content}>

      </View>
    );
  }
}

export default TopicFunsBlock;
