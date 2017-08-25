import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  content: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  proportion_1: {
    flex: 1,
  },
  proportion_4: {
    flex: 4
  },
  top: {
    alignItems: 'flex-start',
  },
  center: {
    justifyContent: 'center',
  },
  simple_row: {
    flexDirection: 'row',
  },

});

class Comment extends Component {
  state = {  }
  render() {
    const { data, num } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.row}>
          <View style={[styles.proportion_1, styles.top]}>
            <Image
              style={styles.image}
              { ...data.author ? {source:{ uri: data.author.avatar_url }} : {} }
            />
          </View>
          <View style={styles.proportion_4}>
            <View style={styles.row}>
              <Text>{data.author ? data.author.loginname : ''}</Text>
              <Text>{moment(data.create_at).fromNow()}</Text>
            </View>
            <HTMLView
              value={data.content}
            />
          </View>
        </View>
        <View style={styles.row}>
          <Text>{`${num+1}楼`}</Text>
          <View style={styles.simple_row}>
            <Icon name="ios-share-alt" size={15} color="#484545">
              <Text>回复</Text>
            </Icon>
            <Icon name="md-thumbs-up" size={15} color="#484545">
              <Text>点赞</Text>
              <Text>{data.ups.length}</Text>
            </Icon>
          </View>
        </View>
      </View>
    );
  }
}

export default Comment;
