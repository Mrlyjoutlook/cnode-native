import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#00bcd4',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  content_left: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content_right: {
    flex: 1,
    justifyContent: 'center',
  },
  spaceLayout: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  fontB: {
    fontSize: 22,
    marginLeft: 10,
    marginRight: 10,
    color: '#fff',
  },
  fontM: {
    fontSize: 16,
    color: '#fff',
  }
});

class TopicAuthor extends PureComponent {
  render() {
    const { name, imageSrc, reply, visit, time } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.content_left}>
          <Image
            style={styles.image}
            source={{ uri: imageSrc }}
          />
          <Text style={styles.fontB}>{name}</Text>
        </View>
        <View style={styles.content_right}>
          <Text style={styles.fontM}>{moment(time).fromNow()}</Text>
          <View style={styles.spaceLayout}>
            <Icon name="md-eye" size={16} color="#fff" />
            <Text style={styles.fontM}>{visit}</Text>
            <Icon name="ios-chatbubbles" size={16} color="#fff" />
            <Text style={styles.fontM}>{reply}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default TopicAuthor;
