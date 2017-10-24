import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentBlock from '../../common/CommentBlock';
import Comment from '../../common/Comment';
import theme from '../../config/styles';
import { goBack, push, agress, launchCmment, REQUEST_COMMENT } from '../../redux/actions';

const styles = StyleSheet.create({
  comment: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});

class CommentPage extends Component {

  static navigationOptions = ({ navigation: { navigate, state: { params } } }) => ({
    headerTitle: '评论区',
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
    commentOpen: false,
    commentWho: '',
    commentId: '',
  }

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    navigation.setParams({
      back: this._handleNavGoBack,
    });
  }

  _handleNavGoBack = () => {
    this.props.dispatch(goBack());
  }

  _commentEvent = (name, id) => {
    const { commentWho } = this.state;
    if (commentWho !== `@${name} `) {
      this.setState({
        commentOpen: true,
        commentWho: `@${name} `,
        commentId: id,
      });
    }
  }

  _agressEvent = (id) => {
    agress(id);
  }

  _closeComment = () => {
    this.setState({
      commentOpen: false,
    });
  }

  _sendCommont = (text) => {
    const { commentId } = this.state;
    const { dispatch, navigation } = this.props;
    const { state: { params: { id } } } = navigation;
    dispatch({ type: REQUEST_COMMENT, id, text, commentId });
  }

  render() {
    const { navigation, listData } = this.props;
    const { commentWho, commentOpen } = this.state;
    const { state: { params: { id, tab } } } = navigation;
    const replies = listData.getIn([tab, 'data', id, 'replies']).toArray();

    return (
      <View style={styles.comment}>
        <ScrollView>
          {
            replies.map((item, i) =>
              <CommentBlock
                key={i}
                num={i}
                data={item}
                commentEvent={this._commentEvent}
                agressEvent={this._agressEvent}
              />
            )
          }
        </ScrollView>
        {
          commentOpen && (
            <Comment
              text={commentWho}
              send={this._sendCommont}
              back={this._closeComment}
            />
          )
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

export default connect(mapStateToProps)(CommentPage);
