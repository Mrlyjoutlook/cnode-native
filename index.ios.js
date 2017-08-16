import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';
import Root from './src/Root';

export default class myappfb extends PureComponent {
  render() {
    return (
      <Root/>
    );
  }
}

AppRegistry.registerComponent('myappfb', () => myappfb);
