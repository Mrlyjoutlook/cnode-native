import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  funsBlock: {
    height: 56,
    borderTopColor: '#DCDCDC',
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

class TopicFunsBlock extends Component {

  static defaultProps = {
    star: false,
    starEvent: () => {},
    wirteEvent: () => {},
    areaEvent: () => {},
    refreshEvent: () => {},
  }

  _handleStar = () => {
    this.props.starEvent();
  }

  _handleWrite = () => {
    this.props.wirteEvent();
  }

  _handleArea = () => {
    this.props.areaEvent();
  }

  _handleRefresh = () => {
    this.props.refreshEvent();
  }

  render() {
    const { star, onPress } = this.props;
    return (
      <View style={styles.funsBlock}>
        <TouchableOpacity onPress={this._handleStar}>
          <Icon name={star ? 'ios-star' : 'ios-star-outline'} size={26} style={{}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleWrite}>
          <Icon name="ios-create-outline" size={26} style={{}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleArea}>
          <Icon name="ios-chatbubbles" size={26} style={{}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this._handleRefresh}>
          <Icon name="ios-refresh" size={26} style={{}} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default TopicFunsBlock;
