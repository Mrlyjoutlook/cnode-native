import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { is } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';

const styles =  StyleSheet.create({
  mess: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  mess_top: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#ccc',
  },
  mess_bottom: {

  }
});

class MessageBlock extends Component {

  static defaultProps = {
    label: '',
    showNum: '',
    data: [],
  }

  _checkAll = () => {

  }

  render() {
    const { label, showNum, data } = this.props;
    return (
      <View style={styles.mess}>
        <View style={styles.mess_top}>
          <Icon name="md-mail" size={26} style={{ marginLeft: 15, marginRight: 15, color: '#fff' }} />
          <Text>{label}</Text>
        </View>
        <View style={styles.mess_bottom}>
          {
            data.map((item, i) => (
              <View key={i}>

              </View>
            ))
          }
          {/* {
            showNum && (
              <TouchableOpacity onPress={this._checkAll}>
                <View>
                  <Text>查看全部</Text>
                </View>
              </TouchableOpacity>
            )
          } */}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {

  }
}

export default MessageBlock;
