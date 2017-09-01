import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import moment from 'moment';

class ListInfo extends Component {

  static defaultProps = {
    listData: [],
  }

  state = {  }
  render() {
    const { listData } = this.props;
    return (
      <View>
        <FlatList
          data={listData}
          // keyExtractor={this._keyExtractor}
          renderItem={({item}) => (
            <TouchableHighlight>
              <View>
                <Text>{item.title}</Text>
                <Text>{moment(item.last_reply_at).fromNow()}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

export default ListInfo;
