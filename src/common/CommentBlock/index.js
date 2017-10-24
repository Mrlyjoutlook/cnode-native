import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { is } from 'immutable';
import HTMLView from 'react-native-htmlview';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../config/styles';

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
  },
  content_left: {
    justifyContent: 'flex-start',
    marginRight: 15,
  },
  content_right: {
    flex: 1,
  },
  right_top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right_middle: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  right_bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  func_row: {
    flexDirection: 'row',
  },
  color_min: {
    color: theme.color_a9a6a6
  },
  color_max: {
    color: theme.color_6b6969
  },
  text_size: {
    fontSize: 16
  }
});

class CommentBlock extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    const { data, num } = nextProps;
    return !is(data, this.props.data) || num !== this.props;
  }

  _handleComment = () => {
    const { data, commentEvent } = this.props;
    commentEvent(data.getIn(['author', 'loginname']), data.get(['id']));
  }

  _handleAgress = () => {
    const { data, agressEvent } = this.props;
    agressEvent(data.get('id'));
  }

  render() {
    const { data, num } = this.props;
    const { author, create_at, content, ups } = data.toObject();
    const { avatar_url, loginname } = author.toObject();
    return (
      <View style={styles.content}>
        <View style={styles.content_left}>
          <Image
            style={styles.image}
            { ...author ? {source:{ uri: avatar_url }} : {} }
          />
        </View>
        <View style={styles.content_right}>
          <View style={styles.right_top}>
            <Text style={styles.color_ccc}>{author ? loginname : ''}</Text>
            <Text style={styles.color_max}>{`${num+1}楼`}</Text>
          </View>
          <View style={styles.right_middle}>
            <HTMLView value={content}/>
          </View>
          <View style={styles.right_bottom}>
            <Text style={styles.color_ccc}>{moment(create_at).fromNow()}</Text>
            <View style={styles.func_row}>
              <TouchableOpacity onPress={this._handleComment}>
                <Icon name="ios-share-alt" size={15} color="#484545">
                  <Text>回复</Text>
                </Icon>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._handleAgress}>
                <Icon name="md-thumbs-up" size={15} color="#484545">
                  <Text>点赞</Text>
                  <Text>{ups.length}</Text>
                </Icon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default CommentBlock;

