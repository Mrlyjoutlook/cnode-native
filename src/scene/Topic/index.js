import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { is } from 'immutable';
import HtmlView from '../../common/HtmlView';
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
  article: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  }
});

class Topic extends PureComponent {

  static navigationOptions = ({ navigation: { navigate, state: { params } } }) => ({
    headerTitle: '详情',
    headerLeft: (
      <View onPress={params ? params.back : null}>
        <Icon name="ios-arrow-back" size={26} style={{marginLeft:10, color: '#fff'}}/>
      </View>
    ),
    headerRight: (
      <View>
        <Text>收藏</Text>
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
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    const { topic } = nextProps;
    if (!is(topic, this.props.topic)) {
      this.setState({ loading: true });
    }
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    const { state: { params: { id } } } = navigation;
    dispatch({ type: GET_TOPIC, id });
    navigation.setParams({
      back: this._handNavGoBack
    });
  }

  _handNavGoBack = () => {
    this.props.dispatch(goBack());
  }

  render() {
    const { loading } = this.state;
    const { navigation, topic } = this.props;
    const { title, content, author: { loginname, avatar_url }, reply_count, visit_count, create_at, replies } = topic.toObject();
    return (
      <View>
        {
          loading ?
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
            <HtmlView
              htmlContent={content}
            />
            <View style={styles.article}>
              <Text>{`${replies.length} 回复`}</Text>
            </View>
            <View>
              {
                replies.map((item, i) => <Comment key={i} num={i} data={item} />)
              }
            </View>
          </ScrollView> : <Refresh/>
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    topic: state.appState.get('topic'),
  }
}

export default connect(mapStateToProps)(Topic);
