import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import ListInfo from '../../common/ListInfo';
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
  },
  blak: {
    height: 20
  },
  column_item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal4: {
    height: 300
  },
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

  _onPressItem = () => {

  }

  render() {
    const { info } = this.props;
    return (
      <View style={{flex:1}}>
        <View style={[styles.author, styles.color_fff]}>
          <View style={[styles.proportion_1]}>
            <Image
              style={styles.image}
              source={{ uri: info.get('avatar_url') }}
            />
          </View>
          <View style={[styles.proportion_3]}>
            <Text style={styles.text}>{info.get('loginname')}</Text>
            <Text style={[styles.text, styles.color_666]}>{`积分：${info.get('score') || 0}`}</Text>
          </View>
          <View style={[styles.proportion_1]}>
            <Icon name="logo-github" size={25} />
          </View>
        </View>

        <TouchableHighlight onPress={this._onPressItem}>
          <View style={[styles.column, styles.color_fff]}>
            <View style={styles.column_item}>
              <Icon name="logo-github" size={30} style={{ marginRight: 10 }} />
              <Text>收藏的话题</Text>
            </View>
            <View style={styles.column_item}>
              <Badge text={100} overflowCount={99} />
              <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressItem}>
          <View style={[styles.column, styles.color_fff]}>
            <View style={styles.column_item}>
              <Icon name="logo-github" size={30} style={{ marginRight: 10 }} />
              <Text>最近参与的话题</Text>
            </View>
            <View style={styles.column_item}>
              <Badge text={100} overflowCount={99} />
              <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressItem}>
          <View style={[styles.column, styles.color_fff]}>
            <View style={styles.column_item}>
              <Icon name="logo-github" size={30} style={{ marginRight: 10 }} />
              <Text>最近创建的话题</Text>
            </View>
            <View style={styles.column_item}>
              <Badge text={100} overflowCount={99} />
              <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.blak}/>

        <TouchableHighlight onPress={this._onPressItem}>
          <View style={[styles.column, styles.color_fff]}>
            <View style={styles.column_item}>
              <Icon name="logo-github" size={30} style={{ marginRight: 10 }} />
              <Text>注销</Text>
            </View>
            <View style={styles.column_item}>
              <Badge text={100} overflowCount={99} />
              <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </TouchableHighlight>

        <Modal
          isOpen={true}
          onClosed={() => {}}
          style={[styles.modal, styles.modal4]}
          position={"center"}
        >
          <ListInfo
            listData={[{
              id: "580460a5fdf3bd3d651186d1",
              last_reply_at: "2016-10-24T04:09:13.002Z",
              title: "推荐你心中的CNode「极客代言人」，打造《中国技术社群英雄谱》"
            },{
              id: "580460a5fdf3bd3d651186d1",
              last_reply_at: "2016-10-24T04:09:13.002Z",
              title: "推荐你心中的CNode「极客代言人」，打造《中国技术社群英雄谱》"
            },{
              id: "580460a5fdf3bd3d651186d1",
              last_reply_at: "2016-10-24T04:09:13.002Z",
              title: "推荐你心中的CNode「极客代言人」，打造《中国技术社群英雄谱》"
            }]}
          />
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.userState.get('info')
  }
}

export default connect(mapStateToProps)(Admin);
