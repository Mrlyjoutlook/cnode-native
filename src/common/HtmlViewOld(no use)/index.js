import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';
import htmlTemplate from './htmlTemplate';

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

class HtmlView extends Component {

  state = {
    height: 500,
  }

  _StateChange = (state) => {
    if(state.title != undefined) {
      const arr = state.title.split('/');
      this.setState({
        height:(parseInt(arr[0]/arr[1])+20)
      })
    }
  }

  render() {
    const { htmlContent } = this.props;
    const html = htmlTemplate(htmlContent).replace(/src="\/\//g, 'src="https:');
    return (
      <View style={{height:this.state.height}}>
        <WebView
          scalesPageToFit={false}
          domStorageEnabled={true}
          javaScriptEnabled={true}
          style={styles.webView}
          source={{html: html}}
          onNavigationStateChange={this._StateChange}
        />
      </View>
    );
  }
}

export default HtmlView;
