import React, { Component } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({

});

class TopicAuthor extends Component {
  state = {}
  render() {
    const { name, imageSrc, reply, visit, time } = this.props;
    return (
      <ScrollView>
        <View>
          <Image
            source={{ uri: imageSrc }}
          />
          <Text>{name}</Text>
        </View>
        <View>
          <Text>{moment(time).fromNow()}</Text>
          <View>
            <Icon name="md-eye" size={15} color="#484545" />
            <Text>{visit}</Text>
            <Icon name="ios-chatbubbles" size={15} color="#484545" />
            <Text>{reply}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default TopicAuthor;
