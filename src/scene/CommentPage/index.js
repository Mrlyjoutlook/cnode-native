import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import CommentBlock from '../../common/CommentBlock';
import Comment from '../../common/Comment';
import theme from '../../config/styles';
import { goBack, push } from '../../redux/actions';

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

  render() {
    const { navigation, listData } = this.props;
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
              />
            )
          }
        </ScrollView>
        <Comment/>
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
