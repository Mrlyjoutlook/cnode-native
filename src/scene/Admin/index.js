import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Badge from '../../common/Badge';
import theme from '../../config/styles';

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  proportion_1: {
    flex: 1,
    justifyContent: 'center',
  },
  proportion_3: {
    flex: 3,
    justifyContent: 'center',
  },
  color_fff: {
    backgroundColor: '#fff'
  },
  color_666: {
    color: '#666'
  },
  text: {
    fontSize: 16,
    marginBottom: 2
  },
  column: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  column_item: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

class Admin extends PureComponent {

  static navigationOptions = {
    headerTitle: '个人中心',
    headerStyle: {
      backgroundColor: theme.backgroundColor,
    },
    headerTitleStyle: {
      color: '#fff'
    },
  };

  render() {

    const columnData = [
      { text: '收藏的话题', icon: 'logo-github' },
      { text: '最近参与的话题', icon: 'logo-github' },
      { text: '最近创建的话题', icon: 'logo-github' },
      { text: '注销', icon: 'logo-github' }
    ];

    return (
      <View>
        <View style={[styles.author, styles.color_fff]}>
          <View style={[styles.proportion_1]}>
            <Image
              style={styles.image}
              source={{ uri: 'https://avatars3.githubusercontent.com/u/16191526?v=4&s=120' }} //avatar_url
            />
          </View>
          <View style={[styles.proportion_3]}>
            <Text style={styles.text}>{'Mrlyjoutlook'}</Text>
            <Text style={[styles.text, styles.color_666]}>{`积分：${100}`}</Text>
          </View>
          <View style={[styles.proportion_1]}>
            <Icon name="logo-github" size={25} />
          </View>
        </View>
        {
          columnData.map((item, i) => (
            <View style={[styles.column, styles.color_fff]} key={i}>
              <View style={styles.column_item}>
                <Icon name={item.icon} size={30} style={{ marginRight: 10 }} />
                <Text>{item.text}</Text>
              </View>
              <View style={styles.column_item}>
                <Badge text={100} overflowCount={99} />
                <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
              </View>
            </View>
          ))
        }
      </View>
    );
  }
}

export default Admin;

//loginname score
