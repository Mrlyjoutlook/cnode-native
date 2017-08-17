import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import { getLabelType } from '../../utils/util';

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  row_1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  row_2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  row_3: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row_3_1: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textDefault: {
    fontSize: 12,
    color: '#484545',
  },
  textLarge: {
    fontSize: 16,
  },
  textTitle: {
    fontSize: 20,
    width: 300,
  },
  label: {
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
    backgroundColor: '#41a7e2',
    marginRight: 10,
  },
  label_font: {
    fontSize: 10,
    color: '#fff'
  },
  red: {
    backgroundColor: 'red'
  },
  green: {
    backgroundColor: 'green'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  }
});

class ListItem extends PureComponent {

  render() {
    const { data } = this.props;
    const { tab, good, top, author, title, create_at, visit_count, reply_count } = data.toObject();
    const { avatar_url, loginname } = author.toObject();
    return (
      <TouchableHighlight>
        <View style={styles.content}>
          <View style={styles.row_1}>
            { tab && <View style={styles.label}><Text style={styles.label_font}>{getLabelType(tab)}</Text></View> }
            { good && <View style={[styles.label, { backgroundColor: 'red' }]}><Text style={styles.label_font}>{getLabelType('good')}</Text></View> }
            { top && <View style={[styles.label, { backgroundColor: 'green' }]}><Text style={styles.label_font}>{getLabelType('top')}</Text></View> }
          </View>
          <View style={styles.row_2}>
            <Image
              style={styles.image}
              source={{ uri: avatar_url }}
            />
            <Text numberOfLines={1} style={styles.textTitle}>{title}</Text>
          </View>
          <View style={styles.row_3}>
            <Text style={[styles.textDefault, styles.textLarge]}>{loginname}</Text>
            <Text style={[styles.textDefault]}>{moment(create_at).fromNow()}</Text>
            <View style={styles.row_3_1}>
              <Icon name="md-eye" size={15} color="#484545" />
              <Text style={[styles.textDefault]}>{visit_count}</Text>
              <Icon name="ios-chatbubbles" size={15} color="#484545" />
              <Text style={[styles.textDefault]}>{reply_count}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}

export default ListItem;
