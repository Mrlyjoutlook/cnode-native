import React, { PureComponent } from 'react'
import { StatusBar, View } from 'react-native'
import { Provider, connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import createStore from './redux/store';
import rootSaga from './redux/saga';
import AppNavigator from './router';

require('moment').locale('zh-cn');

// create store
const { store, run } = createStore();

// go saga
run(rootSaga);

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

const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
};

export default Root;
