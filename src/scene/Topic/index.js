import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { is } from 'immutable';
import Spinner from "react-native-spinkit";
import HtmlRender from '../../ios/HtmlRender';
import TopicAuthor from '../../common/TopicAuthor';
import Refresh from '../../common/Refresh';
import Comment from '../../common/Comment'
import theme from '../../config/styles';
import { GET_TOPIC, goBack } from '../../redux/actions';

const styles = StyleSheet.create({
  title: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_text: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#333',
    fontSize: 20,
  },
  section: {
    backgroundColor: '#fff'
  },
  article: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150
  },
  content: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16
  },
});

class Topic extends PureComponent {

  static navigationOptions = ({ navigation: { navigate, state: { params } } }) => ({
    headerTitle: '详情',
    headerLeft: (
      <View>
        <TouchableOpacity onPress={params ? params.back : null}>
          <Icon name="ios-arrow-back" size={26} style={{ marginLeft: 10, color: '#fff' }} />
        </TouchableOpacity>
      </View>
    ),
    headerRight: (
      <View>
        <TouchableOpacity onPress={params ? params.collect : null}>
          <Icon
            name={!params.isCollect ? 'ios-heart-outline' : 'ios-heart'}
            size={24}
            style={{ marginRight: 12, color: '#fff' }}
          />
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: theme.backgroundColor,
      borderWidth: 0,
    },
    headerTitleStyle: {
      color: '#fff'
    },
  });

  state = {
    loading: false,
    htmlHeight: 0,
  }

  componentWillReceiveProps(nextProps) {
    const { listData, navigation } = nextProps;
    const { state: { params: { tab } } } = navigation;
    if (!is(listData.getIn([tab, 'data']), this.props.listData.getIn([tab, 'data']))) {
      this.setState({ loading: false });
    } else {

    }
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    dispatch({ type: GET_TOPIC, id, tab });
    navigation.setParams({
      back: this._handleNavGoBack,
      collect: this._handleCollect,
      isCollect: false
    });
  }

  _handleNavGoBack = () => {
    this.props.dispatch(goBack());
  }

  _handleCollect = () => {
    const { navigation } = this.props;
    navigation.setParams({
      isCollect: true
    });
  }

  _layoutDidFinish = (value) => {
    // console.log('_layoutDidFinish', value);
    this._htmlHeight = value.height;
    this.setState({
      htmlHeight: value.height
    });
  }

  _clickUserLink = (value) => {
    console.log('_clickUserLink', value);
  }

  // _htmlHeight = 0

  render() {
    const { loading } = this.state;
    const { navigation, listData } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    const { title, content, author: { loginname, avatar_url }, reply_count, visit_count, create_at, replies } = listData.getIn([tab, 'data', id]);
    return (
      <View>
        <ScrollView>
          <TopicAuthor
            name={loginname}
            imageSrc={avatar_url}
            reply={reply_count}
            visit={visit_count}
            time={create_at}
          />
          <View style={styles.title}>
            <Text style={styles.title_text}>{title}</Text>
          </View>
          <HtmlRender
            content={content}
            onChange={this._layoutDidFinish}
            onClickUserLink={(value) => this._layoutDidFinish(value)}
            style={[styles.content, {height: this.state.htmlHeight}]}
          />
          {/* <View style={styles.article}>
            {
              replies && <Text>{`${replies.length} 回复`}</Text>
            }
          </View> */}
          {/* <View>
            {
              replies && replies.map((item, i) => <Comment key={i} num={i} data={item} />)
            }
          </View> */}
        </ScrollView>
        <View style={styles.spinner}>
          <Spinner
            isVisible={loading}
            size={40}
            type="FadingCircle"
            color="#00bcd4"
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    listData: state.appState.get('listData'),
  }
}

export default connect(mapStateToProps)(Topic);
