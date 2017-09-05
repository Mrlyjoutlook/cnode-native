import React, { Component } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { is } from 'immutable';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modalbox';
import AppNavigator from './router';
import LoadModal from './common/LoadModal';
import PromptModal from './common/PromptModal';
import ListInfo from './common/ListInfo';
import { CLOSE_MESSAGE, CLOSEMODAL_PUSH, modal, push } from './redux/actions';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modal: {
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modal_top: {
    marginTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    width: width,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

class App extends Component {

  state = {
    prompt: {
      Visible: false,
      message: '',
    }
  }

  componentDidMount() {
    SplashScreen.hide(); // 隐藏启动屏
  }

  componentWillReceiveProps(nextProps) {
    const { message } = nextProps;
    if (!is(message, this.props.message)) {
      this.setState({
        prompt: {
          visible: message.get('content') ? true : false,
          message: message.get('content'),
        }
      })
    }
  }

  _promptBtnFunc = () => {
    this.props.dispatch({ type: CLOSE_MESSAGE });
  }

  _onClosedModal = () => {
    this.props.dispatch({ type: CLOSEMODAL_PUSH });
  }

  _onClickListInfo = (id) => {
    this.props.dispatch({ type: CLOSEMODAL_PUSH, id });
  }

  render() {
    const { prompt } = this.state;
    const { requestLoad, modal, dispatch, routerState } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: routerState,
        })} />
        <LoadModal
          visible={requestLoad}
        />
        <PromptModal
          visible={prompt.visible}
          content={prompt.message}
          btnFunc={this._promptBtnFunc}
        />
        <Modal
          isOpen={modal.get('open')}
          swipeToClose={true}
          onClosed={this._onClosedModal}
          style={[styles.modal]}
        >
          <View style={styles.modal_top}>
            <View></View>
            <Text>{modal.get('title')}</Text>
            <Icon name="md-close" size={25} onPress={this._onClosedModal}/>
          </View>
          <ListInfo
            onClick={this._onClickListInfo}
            listData={[{
              id: "580460a5fdf3bd3d651186d1",
              last_reply_at: "2016-10-24T04:09:13.002Z",
              title: "推荐你心中的CNode「极客代言人」，打造《中国技术社群英雄谱》"
            }, {
              id: "580460a5fdf3bd3d651186d1",
              last_reply_at: "2016-10-24T04:09:14.002Z",
              title: "推荐你心中的CNode「极客代言人」，打造《中国技术社群英雄谱》"
            }, {
              id: "580460a5fdf3bd3d651186d1",
              last_reply_at: "2016-10-24T04:09:15.002Z",
              title: "推荐你心中的CNode「极客代言人」，打造《中国技术社群英雄谱》"
            }]}
          />
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  routerState: state.routerState,
  requestLoad: state.appState.get('requestLoad'),
  error: state.appState.get('error'),
  message: state.appState.get('message'),
  modal: state.appState.get('modal')
});

export default connect(mapStateToProps)(App);
