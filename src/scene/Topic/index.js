import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { is } from 'immutable';
import HtmlRender from '../../ios/HtmlRender';
import TopicAuthor from '../../common/TopicAuthor';
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
  scroll: {
    backgroundColor: '#fff',
  }
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
    htmlHeight: 0,
  }

  componentWillReceiveProps(nextProps) {
    const { listData, navigation } = nextProps;
    const { state: { params: { tab, id } } } = navigation;
    if (!is(listData.getIn([tab, 'data', id]), this.props.listData.getIn([tab, 'data', id]))) {
      if (listData.getIn([tab, 'data', id, 'is_collect'])) {
        navigation.setParams({
          back: this._handleNavGoBack,
          collect: this._handleCollect,
          isCollect: true
        });
      }
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
    this.setState({
      htmlHeight: value.height
    });
  }

  _clickUserLink = (value) => {
    console.log('_clickUserLink', value);
  }

  render() {
    const { loading } = this.state;
    const { navigation, listData } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    const { title, content, author: { loginname, avatar_url }, reply_count, visit_count, create_at, replies } = listData.getIn([tab, 'data', id]);
    return (
      <View>
        <ScrollView style={styles.scroll}>
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
            onChange={(value) => this._layoutDidFinish(value)}
            onClickUserLink={this._clickUserLink}
            style={{height: this.state.htmlHeight}}
          />
        </ScrollView>
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
