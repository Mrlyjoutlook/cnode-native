import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { modal, goBack, GET_USERINFO, SIGN_OUT, SEND_MESSAGE } from '../../redux/actions';
import Badge from '../../common/Badge';
import theme from '../../config/styles';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  proportion_1: {
    flex: 1,
    justifyContent: 'center',
  },
  proportion_3: {
    flex: 3,
    justifyContent: 'center',
  },
  color_fff: {
    backgroundColor: '#fff'
  },
  color_666: {
    color: '#666'
  },
  text: {
    fontSize: 16,
    marginBottom: 2
  },
  column: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  blak: {
    height: 20
  },
  column_item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

class Admin extends PureComponent {

  static navigationOptions = ({ navigation: { navigate, state: { params } } }) => ({
    headerTitle: '个人中心',
    headerLeft: (
      <View>
        <TouchableOpacity onPress={params ? params.back : null}>
          <Icon name="ios-arrow-back" size={26} style={{marginLeft:10, color: '#fff'}}/>
        </TouchableOpacity>
      </View>
    ),
    headerStyle: {
      backgroundColor: theme.backgroundColor,
    },
    headerTitleStyle: {
      color: '#fff'
    },
  });

  componentDidMount() {
    const { dispatch, navigation } = this.props;
    dispatch({ type: GET_USERINFO });
    navigation.setParams({
      back: this._handNavGoBack
    });
  }

  _handNavGoBack = () => {
    this.props.dispatch(goBack());
  }

  _onPressItem = (type, title) => {
    return () => {
      const { dispatch } = this.props;
      dispatch(modal({open: true, type, title, }));
    }
  }

  _loginOut = () => {
    const { dispatch } = this.props;
    dispatch({
      type: SEND_MESSAGE,
      content: '退出当前账户？',
      btn: [{
        text: '取消',
        onPress: () => {}
      }, {
        text: '确定',
        onPress: () => {
          this.props.dispatch({ type: SIGN_OUT });
        }
      }]
    });
  }

  render() {
    const { info } = this.props;
    return (
      <View style={{flex:1}}>
        <View style={[styles.author, styles.color_fff]}>
          <View style={[styles.proportion_1]}>
            <Image
              style={styles.image}
              source={{ uri: info.get('avatar_url') }}
            />
          </View>
          <View style={[styles.proportion_3]}>
            <Text style={styles.text}>{info.get('loginname')}</Text>
            <Text style={[styles.text, styles.color_666]}>{`积分：${info.get('score') || 0}`}</Text>
          </View>
          <View style={[styles.proportion_1]}>
            <Icon name="logo-github" size={25} />
          </View>
        </View>

        <TouchableHighlight onPress={this._onPressItem('collect', '收藏的话题')}>
          <View style={[styles.column, styles.color_fff]}>
            <View style={styles.column_item}>
              <Icon name="logo-github" size={30} style={{ marginRight: 10 }} />
              <Text>收藏的话题</Text>
            </View>
            <View style={styles.column_item}>
              <Badge text={100} overflowCount={99} />
              <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressItem('recent_replies', '最近参与的话题')}>
          <View style={[styles.column, styles.color_fff]}>
            <View style={styles.column_item}>
              <Icon name="logo-github" size={30} style={{ marginRight: 10 }} />
              <Text>最近参与的话题</Text>
            </View>
            <View style={styles.column_item}>
              <Badge text={info.get('recent_replies') && info.get('recent_replies').size} overflowCount={99} />
              <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressItem('recent_topics', '最近创建的话题')}>
          <View style={[styles.column, styles.color_fff]}>
            <View style={styles.column_item}>
              <Icon name="logo-github" size={30} style={{ marginRight: 10 }} />
              <Text>最近创建的话题</Text>
            </View>
            <View style={styles.column_item}>
              <Badge text={info.get('recent_topics') && info.get('recent_topics').size} overflowCount={99} />
              <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.blak}/>

        <TouchableHighlight onPress={this._loginOut}>
          <View style={[styles.column, styles.color_fff]}>
            <View style={styles.column_item}>
              <Icon name="logo-github" size={30} style={{ marginRight: 10 }} />
              <Text>注销</Text>
            </View>
            <View style={styles.column_item}>
              <Icon name="ios-arrow-forward" size={30} style={{ marginLeft: 10 }} />
            </View>
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.userState.get('info')
  }
}

export default connect(mapStateToProps)(Admin);
