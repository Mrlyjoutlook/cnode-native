import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  text: {
    color: '#d0e9ff',
    marginLeft: 10,
  }
});

class Radio extends Component {

  static defaultProps = {
    value: '',
    text: 'please set text and value',
    onChange: () => {}
  }

  state = {
    check: false,
  }

  _onPressButton = () => {
    this.setState({
      check: !this.state.check,
    }, ()=>{
      this.props.onChange(!this.state.check, this.props.value);
    })
  }

  render() {
    const { text } = this.props;
    const { check } = this.state;
    return (
      <View style={styles.content}>
        <TouchableHighlight onPress={this._onPressButton}>
          <Icon name={check ? 'ios-radio-button-on' : 'ios-radio-button-off'} size={25} color="#d0e9ff" />
        </TouchableHighlight>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

export default Radio;
