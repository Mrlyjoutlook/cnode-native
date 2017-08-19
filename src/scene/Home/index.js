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

  state = {
    data: [
      {
        author: {loginname: "i5ting", avatar_url: "https://avatars.githubusercontent.com/u/12227405?v=3&s=120"},
        author_id : "54009f5ccd66f2eb37190485",
        content: '<div class="markdown-text"><p>本来提供开发api，目的是为了开发第三方应用或客户端，如果大家用来学习也是好的，但现在很多人太过分了，随意发帖，at，严重影响了社区的用户，故而决定开始严查</p>↵<p>以下情况，直接封号</p>↵<ul>↵<li>测试标题</li>↵<li>无任何内容</li>↵<li>无意义回复</li>↵<li>测试帖，5分钟内没有删除</li>↵</ul>↵<p>欢迎大家监督</p>↵<p>封号</p>↵<ul>↵<li><a href="https://cnodejs.org/user/Mwangzhi">https://cnodejs.org/user/Mwangzhi</a></li>↵<li><a href="https://cnodejs.org/user/lw6395">https://cnodejs.org/user/lw6395</a></li>↵<li><a href="https://cnodejs.org/user/shengliang74">https://cnodejs.org/user/shengliang74</a>  竟然挑衅，发帖说你来打我呀。。。。</li>↵<li><a href="https://cnodejs.org/user/h5-17">https://cnodejs.org/user/h5-17</a> <a href="/user/h5-17">@h5-17</a></li>↵<li><a href="https://cnodejs.org/user/592php">https://cnodejs.org/user/592php</a> <a href="/user/592php">@592php</a></li>↵</ul>↵<hr>↵<p>20170601更新</p>↵<p><a href="https://cnodejs.org/?tab=dev">https://cnodejs.org/?tab=dev</a>  目前开了一个『客户端测试』专区，以后开发新客户端的同学，帖子直接发到这个专区去。tab 的值是 dev。</p>↵<p><img src="//dn-cnode.qbox.me/FundjyBuYk60yqQ-PdKstrPKY-7-" alt="image.png"></p>↵</div>"',
        create_at: "2017-05-27T06:07:49.278Z",
        good: false,
        id: "592917b59e32cc84569a7458",
        last_reply_at: "2017-08-16T03:05:44.854Z",
        reply_count: 76,
        tab: "share",
        title: "测试请发到客户端测试专区，违规影响用户的，直接封号",
        top: true,
        visit_count: 14120
      }
    ],
  }

  handleClick = (id) => {
    const { dispatch } = this.props;
    dispatch(push({
      name: 'Topic',
      params: { id }
    }));
  }

  handleOnChangeTab = (val) => {
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
          onChangeTab={this.handleOnChangeTab}
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
            renderItem={({item, i}) => <ListItem key={i} data={item} onPress={this.handleClick} />}
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
