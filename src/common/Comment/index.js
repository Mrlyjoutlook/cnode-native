import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  comment: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  comment_input: {
    height: 36,
    width: '85%',
    borderWidth: 1,
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
  },
  comment_send: {
    width: '15%',
    alignItems: 'center'
  }
});

class Comment extends Component {

  static defaultProps = {
    star: false,
  }

  state = {
    text: '',
  }

  _handleOnChangeText = (text) => {
    this.setState({
      text: text
    });
  }

  _send = () => {

  }

  _back = () => {
    this.props.back();
  }

  render() {
    const { star } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.comment}>
        <TextInput
          style={styles.comment_input}
          multiline={true}
          placeholder="写评论..."
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
