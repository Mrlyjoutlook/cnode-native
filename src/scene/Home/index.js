import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { is } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_LIST, CHANGE_TAB, push, getNoReadMessage } from '../../redux/actions';
import TabView from '../../common/TabView';
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

  static navigationOptions = ({ navigation: { navigate, state: { params } } }) => ({
    headerLeft: (
      <View>
        <Text style={styles.navLeft}>Cnode中文社区</Text>
      </View>
    ),
    headerRight: (
      <View style={styles.navRight}>
        <TouchableOpacity onPress={ params ? params.push('') : null }>
          <Icon name="ios-notifications" size={25} color="#fff" />
        </TouchableOpacity>
        <Badge text={0} overflowCount={99} customStyle={styles.badge} />
        <TouchableOpacity onPress={ params ? params.push('Admin') : null }>
          <Icon name="md-person" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: theme.backgroundColor,
      borderWidth: 0,
    }
  })

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    dispatch({ type:GET_LIST, tab: 'all' });
    dispatch(getNoReadMessage());
    navigation.setParams({
      push: this._handleClickNav
    });
  }

  shouldComponentUpdate(nextProps) {
    const { listBase, listInfo, listData } = nextProps;
    return !is(listBase, this.props.listBase) || !is(listInfo, this.props.listInfo) || !is(listData, this.props.listData);
  }

  state = {}

  _handleClickNav = (type) => {
    return () => {
      const { dispatch } = this.props;
      dispatch(push({
        name: type
      }));
    }
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
          <TabView
            tabLabel="全部"
            data={listData.get('all').toArray()}
            click={this._handleClick}
          />
          <TabView
            tabLabel="精华"
            data={listData.get('good').toArray()}
            click={this._handleClick}
          />
          <TabView
            tabLabel="分享"
            data={listData.get('share').toArray()}
            click={this._handleClick}
          />
          <TabView
            tabLabel="回答"
            data={listData.get('ask').toArray()}
            click={this._handleClick}
          />
          <TabView
            tabLabel="招聘"
            data={listData.get('job').toArray()}
            click={this._handleClick}
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
    listData: state.appState.get('listData')
  }
}

export default connect(mapStateToProps)(Home);
