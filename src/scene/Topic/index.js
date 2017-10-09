import React, { PureComponent } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
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
      <View>
        <TouchableOpacity onPress={params ? params.back : null}>
          <Icon name="ios-arrow-back" size={26} style={{ marginLeft: 10, color: '#fff' }} />
        </TouchableOpacity>
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
    const { state: { params: { id, tab } } } = navigation;
    dispatch({ type: GET_TOPIC, id, tab });
    navigation.setParams({
      back: this._handNavGoBack
    });
  }

  _handNavGoBack = () => {
    this.props.dispatch(goBack());
  }

  render() {
    const { loading } = this.state;
    const { navigation, listData } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    const { title, content, author: { loginname, avatar_url }, reply_count, visit_count, create_at, replies } = listData.getIn([tab, 'data'])[id];
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
          {
            loading ?
              <HtmlView
                value={content.replace(/src="\/\//g, 'src="https:')}
              /> :
              <Refresh />
          }
          <View style={styles.article}>
            <Text>{`${replies && replies.length} 回复`}</Text>
          </View>
          <View>
            {
              replies && replies.map((item, i) => <Comment key={i} num={i} data={item} />)
            }
          </View>
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
