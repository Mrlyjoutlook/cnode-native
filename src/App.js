import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { is } from 'immutable';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from './router';
import LoadModal from './common/LoadModal';
import PromptModal from './common/PromptModal';
import { CLOSE_MESSAGE } from './redux/actions';

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

  render() {
    const { prompt } = this.state;
    const { requestLoad } = this.props;
    return (
      <View style={{flex:1}}>
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.routerState,
        })} />
        <LoadModal
          visible={requestLoad}
        />
        <PromptModal
          visible={prompt.visible}
          content={prompt.message}
          btnFunc={this._promptBtnFunc}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  routerState: state.routerState,
  requestLoad: state.appState.get('requestLoad'),
  error: state.appState.get('error'),
  message: state.appState.get('message')
});

export default connect(mapStateToProps)(App);
