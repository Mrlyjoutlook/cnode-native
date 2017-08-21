/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';
import Root from './src/Root';

export default class App extends PureComponent {
    render() {
        return (
            <Root />
        );
    }
}

AppRegistry.registerComponent('App', () => App);
