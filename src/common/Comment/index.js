import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  comment: {
    backgroundColor: '#fff',
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
  },
  comment_input: {
    height: 36,
    width: '80%',
    borderColor: '#DCDCDC',
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
  },
  comment_send: {
    alignItems: 'center',
    marginRight: 10,
  }
});

class Comment extends Component {

  static defaultProps = {
    placeholder: '请输入',
    back: () => {},
    _send: () => {},
    text: '',
  }

  state = {
    text: this.props.text,
  }

  componentWillReceiveProps(nextProps) {
    const { text } = nextProps;
    if (text !== this.props.text) {
      this.setState({
        text: text
      });
    }
  }

  _handleOnChangeText = (text) => {
    this.setState({
      text: text
    });
  }

  _send = () => {
    const { text } = this.state;
    this.props.send(text);
  }

  _back = () => {
    this.props.back();
  }

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.comment}>
        <TextInput
          style={styles.comment_input}
          multiline={true}
          placeholder={placeholder}
          placeholderTextColor="#ccc"
          underlineColorAndroid="transparent"
          onChangeText={this._handleOnChangeText}
          value={text}
        />
        <View style={styles.comment_send}>
          <TouchableOpacity
            onPress={text ? this._send : this._back}
          >
            {
              text ?
              <Icon name="ios-send" size={30} style={{ color: '#ccc' }} /> :
              <Icon name="md-arrow-round-back" size={30} style={{ color: '#ccc' }} />
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Comment;
