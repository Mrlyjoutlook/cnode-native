import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import moment from 'moment';
import { push } from '../../common/../redux/actions';

const styles = StyleSheet.create({
  content: {
    marginTop: 24
  },
  center: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'flex-end',
  },
  bottomhr: {
    borderBottomWidth: 1,
    borderColor: '#666'
  }
});

class ListInfo extends Component {

  static defaultProps = {
    listData: [],
  }

  state = {  }

  _keyExtractor = (item, index) => item.last_reply_at;

  _onClickItem = (id) => {
    return () => {
      this.props.onClick(id);
    }
  }

  render() {
    const { listData } = this.props;
    return (
      <View style={styles.content}>
        <FlatList
          data={listData}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) => (
            <TouchableHighlight onPress={this._onClickItem(item.id)}>
              <View style={styles.bottomhr}>
                <View style={styles.center}>
                  <Text>{item.title}</Text>
                </View>
                <View style={[styles.center, styles.right]}>
                  <Text>{moment(item.last_reply_at).fromNow()}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

export default ListInfo;
