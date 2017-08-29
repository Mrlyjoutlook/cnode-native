import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './router';
import LoadModal from './common/LoadModal';

class App extends Component {

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
  requestLoad: state.appState.get('requestLoad')
});

export default connect(mapStateToProps)(App);
