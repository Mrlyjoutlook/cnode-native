import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { is } from 'immutable';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './router';
import LoadModal from './common/LoadModal';

class App extends Component {

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (!is(error, this.props.error)) {
      // Alert.alert(
      //   '提示',
      //   error.get('data').get(error.get('order')+'').get('message'),
      //   { cancelable: false }
      // )
    }
  }

  render() {
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
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  routerState: state.routerState,
  requestLoad: state.appState.get('requestLoad'),
  error: state.appState.get('error'),
});

export default connect(mapStateToProps)(App);
