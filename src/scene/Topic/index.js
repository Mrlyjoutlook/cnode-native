import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import HtmlView from '../../common/HtmlView';
import TopicAuthor from '../../common/TopicAuthor';
import theme from '../../config/styles';
import { GET_TOPIC } from '../../redux/actions';

const styles = StyleSheet.create({
  title: {
    // marginTop: 10,
    // marginBottom: 10,
    // marginLeft: 10,
    // marginRight: 10,
    // height: 40,
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
  }
});

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
    const { title, content, author: { loginname, avatar_url }, reply_count, visit_count, create_at } = topic.toObject();
    return (
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
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    topic: state.appState.get('topic')
  }
}

export default connect(mapStateToProps)(Topic);
