import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableHighlight, StyleSheet, StatusBar, FlatList } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { is } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_LIST, CHANGE_TAB, push } from '../../redux/actions';
import ListItem from '../../common/ListItem';
import Badge from '../../common/Badge';
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
  badge: {
    position: 'absolute',
    left: 10,
    top: 6
  }
});

class Home extends Component {

  static navigationOptions = ({ navigation: { navigate } }) => ({
    headerLeft: (
      <View>
        <Text style={styles.navLeft}>Cnode中文社区</Text>
      </View>
    ),
    headerRight: (
      <View style={styles.navRight}>
        <TouchableHighlight>
          <Icon name="ios-notifications" size={25} color="#fff" />
        </TouchableHighlight>
        <Badge text={100} overflowCount={99} customStyle={styles.badge} />
        <TouchableHighlight onPress={() => navigate('Admin')}>
          <Icon name="md-settings" size={25} color="#fff" />
        </TouchableHighlight>
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
    const { listBase, listInfo, listData } = nextProps;
    return !is(listBase, this.props.listBase) || !is(listInfo, this.props.listInfo) || !is(listData, this.props.listData);
  }

  state = {}

  _handleClickSet = () => {
    const { dispatch } = this.props;
    dispatch(push({
      name: 'Admin'
    }))
  }

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
    let tab = { initialPage: i, tab: 'all' }, str = '';
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
    tab.tab = str;
    if (listData.get(tab.tab).size === 0) {
      dispatch({ type:GET_LIST, ...tab });
    } else {
      dispatch({ type:CHANGE_TAB, ...tab });
    }
  }

  _keyExtractor = (item, index) => item.id;

  _renderTabBar = () => <DefaultTabBar />

  render() {
    const { listData, listBase } = this.props;
    return (
      <View style={styles.content}>
        <StatusBar
          barStyle="light-content"
        />
        <ScrollableTabView
          initialPage={listBase.get('initialPage')}
          renderTabBar={this._renderTabBar}
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
            data={listData.get('all').toArray()}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <ListItem data={item} onPress={this._handleClick} />}
          />
          <FlatList
            tabLabel="精华"
            data={listData.get('good').toArray()}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <ListItem data={item} onPress={this._handleClick} />}
          />
          <FlatList
            tabLabel="分享"
            data={listData.get('share').toArray()}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <ListItem data={item} onPress={this._handleClick} />}
          />
          <FlatList
            tabLabel="回答"
            data={listData.get('ask').toArray()}
            keyExtractor={this._keyExtractor}

            renderItem={({item}) => <ListItem data={item} onPress={this._handleClick} />}
          />
          <FlatList
            tabLabel="招聘"
            data={listData.get('job').toArray()}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => <ListItem data={item} onPress={this._handleClick} />}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    listBase: state.appState.getIn(['listInfo', 'base']),
    listInfo: state.appState.get('listInfo'),
    listData: state.appState.get('listData'),
  }
}

export default connect(mapStateToProps)(Home);
