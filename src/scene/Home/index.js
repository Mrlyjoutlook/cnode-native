import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { is } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_LIST, CHANGE_TAB, push } from '../../redux/actions';
import ListItem from '../../common/ListItem';
import theme from '../../config/styles';

const styles =  StyleSheet.create({
  navLeft: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  navRight: {
    marginRight: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 60,
  },
  content: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EBEBEB',
		flex: 1
  },
  tabView: {
    alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EBEBEB',
		flex: 1
  },
});

class Home extends Component {

  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <View>
        <Text style={styles.navLeft}>Cnode中文社区</Text>
      </View>
    ),
    headerRight: (
      <View style={styles.navRight}>
        <Icon name="ios-notifications" size={25} color="#fff" />
        <Icon name="md-settings" size={25} color="#fff" />
      </View>
    ),
    headerStyle: {
      backgroundColor: theme.backgroundColor,
      borderWidth: 0,
    }
  })

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type:GET_LIST, tab: 'all' });
  }

  shouldComponentUpdate(nextProps) {
    const { tab, listData } = nextProps;
    return !is(tab, this.props.tab) || !is(listData, this.props.listData);
  }

  state = {}

  _handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(push({
      name: 'Topic',
      params: { id }
    }));
  }

  _handleOnChangeTab = (val) => {
    const { dispatch, listData } = this.props;
    const { i } = val;
    let str = 'all';
    switch (i){
      case 0:
        str = 'all';
        break;
      case 1:
        str = 'good';
        break;
      case 2:
        str = 'share';
        break;
      case 3:
        str = 'ask';
        break;
      case 4:
        str = 'job';
        break;
    }
    if (listData.get(str).size === 0) {
      dispatch({ type:GET_LIST, tab: str });
    } else {
      dispatch({ type:CHANGE_TAB, tab: str });
    }
  }

  _keyExtractor = (item, index) => item.id;

  render() {
    const { listData, tab } = this.props;
    return (
      <View style={styles.content}>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollableTabView
          // initialPage={0}
          renderTabBar={() => <DefaultTabBar />}
          onChangeTab={this._handleOnChangeTab}
          tabBarUnderlineStyle={{
            backgroundColor: '#ace9f1',
          }} // 下划线样式
          tabBarBackgroundColor={theme.backgroundColor} // 背景色
          tabBarActiveTextColor="#ffffff"  // 选中字体颜色
          tabBarInactiveTextColor="#ace9f1"  // 未选中字体颜色
          tabBarTextStyle={{fontSize: 14}} // 字体默认样式
          style={{borderWidth: 0}}
        >
          <FlatList
            tabLabel="全部"
            data={listData.get(tab).toArray()}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <ListItem data={item} onPress={this._handleClick} />}
          />
          <FlatList
            tabLabel="精华"
            data={listData.get(tab).toArray()}
            renderItem={({item}) => <ListItem data={item} />}
          />
          <FlatList
            tabLabel="分享"
            data={listData.get(tab).toArray()}
            renderItem={({item}) => <ListItem data={item} />}
          />
          <FlatList
            tabLabel="回答"
            data={listData.get(tab).toArray()}
            renderItem={({item}) => <ListItem data={item} />}
          />
          <FlatList
            tabLabel="招聘"
            data={listData.get(tab).toArray()}
            renderItem={({item}) => <ListItem data={item} />}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tab: state.appState.getIn(['listInfo', 'tab']),
    listData: state.appState.get('listData'),
  }
}

export default connect(mapStateToProps)(Home);
