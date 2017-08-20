import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import TopicAuthor from '../../common/TopicAuthor';
import theme from '../../config/styles';
import { GET_TOPIC } from '../../redux/actions';

class Topic extends PureComponent {

  static navigationOptions = {
    title: '详情',
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
  };

  componentDidMount() {
    const { dispatch, navigation: { state: { params: { id } } } } = this.props;
    dispatch({ type: GET_TOPIC, id });
  }

  render() {
    const { navigation, topic } = this.props;
    const { content, author: { loginname, avatar_url }, reply_count, visit_count, create_at } = topic.toObject();
    return (
      <View>
        <TopicAuthor
          name={loginname}
          imageSrc={avatar_url}
          reply={reply_count}
          visit={visit_count}
          time={create_at}
        />
        <HTMLView
          value={content}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    topic: state.appState.get('topic')
  }
}

export default connect(mapStateToProps)(Topic);
