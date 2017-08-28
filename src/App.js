import React, { PureComponent } from 'react';
import { StatusBar, View } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import AppNavigator from './router';

class App extends PureComponent {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.routerState,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  routerState: state.routerState
});

export default connect(mapStateToProps)(App);
