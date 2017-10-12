import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { is } from 'immutable';
import Icon from 'react-native-vector-icons/Ionicons';
import MessageBlock from '../../common/MessageBlock';
import theme from '../../config/styles';
import { goBack } from '../../redux/actions';

const {height, width} = Dimensions.get('window');

const styles =  StyleSheet.create({
  news: {
    backgroundColor: theme.backgroundColor,
    height: height,
  },
  bar: {
    height: 15
  }
});

class News extends Component {

  static navigationOptions = ({ navigation: { navigate, state: { params } } }) => ({
    headerTitle: '消息',
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
    const { navigation } = this.props;
    const { state: { params: { id, tab } } } = navigation;
    navigation.setParams({
      back: this._handleNavGoBack
    });
  }

  _handleNavGoBack = () => {
    this.props.dispatch(goBack());
  }

  render() {
    const { noReadMessages, readMessages } = this.props;
    return (
      <View style={styles.news}>
        <MessageBlock
          label="未读"
          showNum={3}
          data={noReadMessages.get('data')}
        />
        <View style={styles.bar} />
        <MessageBlock
          label="已读"
          data={readMessages.get('data')}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    noReadMessages: state.userState.get('noReadMessages'),
    readMessages: state.userState.get('readMessages'),
  }
}

export default connect(mapStateToProps)(News);
