import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { is } from 'immutable';
import Spinner from "react-native-spinkit";
import HtmlRender from '../../ios/HtmlRender';
import TopicAuthor from '../../common/TopicAuthor';
import TopicFunsBlock from '../../common/TopicFunsBlock';
import Comment from '../../common/Comment';
import theme from '../../config/styles';
import { GET_TOPIC, OPERATE_COLLECT, goBack, push } from '../../redux/actions';

const styles = StyleSheet.create({
  topic: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
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
  },
  spinner: {
    zIndex: 100,
    position: 'absolute',
    left: '50%',
    marginLeft: -20,
    top: '50%',
    marginTop: -20,
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
    topicBottomType: 'funsblock', // comment or funsblock
    loading: false,
  }

  componentWillReceiveProps(nextProps) {
    const { listData, navigation } = nextProps;
    const { state: { params: { tab, id } } } = navigation;
    if (!is(listData.getIn([tab, 'data', id]), this.props.listData.getIn([tab, 'data', id]))) {
      this.setState({
        loading: false
      });
    }
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    dispatch({ type: GET_TOPIC, id, tab });
    navigation.setParams({
      back: this._handleNavGoBack,
    });
  }

  _handleNavGoBack = () => {
    this.props.dispatch(goBack());
  }

  _layoutDidFinish = (value) => {
    this.setState({
      htmlHeight: value.height
    });
  }

  _clickUserLink = (value) => {
    console.log('_clickUserLink', value);
  }

  _starEvent = () => {
    const { navigation, listData } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    dispatch({ type: OPERATE_COLLECT, id, tab });
  }

  _wirteEvent = () => {
    this.setState({
      topicBottomType: 'comment'
    });
  }

  _areaEvent = () => {
    const { dispatch } = this.props;
    dispatch(push({
      name: 'Comment',
      params: {}
    }));
  }

  _refreshEvent = () => {
    const { dispatch, navigation } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    this.setState({
      loading: true,
    }, () => {
      dispatch({ type: GET_TOPIC, id, tab });
    });
  }

  _handleBack = () => {
    this.setState({
      topicBottomType: 'funsblock'
    });
  }

  render() {
    const { loading, topicBottomType } = this.state;
    const { navigation, listData } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    const { title, content, author: { loginname, avatar_url }, reply_count, visit_count, create_at, replies, is_collect } = listData.getIn([tab, 'data', id]);
    return (
      <View style={styles.topic}>
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
            onChange={(value) => this._layoutDidFinish(value)}
            onClickUserLink={this._clickUserLink}
            style={{ height: this.state.htmlHeight }}
          />
        </ScrollView>
        <View style={styles.spinner}>
          <Spinner
            isVisible={loading}
            size={40}
            type="FadingCircleAlt"
            color="#00bcd4"
          />
        </View>
        {
          topicBottomType === 'comment' ?
            <Comment
              back={this._handleBack}
            /> :
            <TopicFunsBlock
              star={is_collect}
              starEvent={this._starEvent}
              wirteEvent={this._wirteEvent}
              areaEvent={this._areaEvent}
              refreshEvent={this._refreshEvent}
            />
        }
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
