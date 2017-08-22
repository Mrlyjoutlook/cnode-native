import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';

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

  _renderHtml = () => {
    const { htmlContent } = this.props;
    return `<!DOCTYPE html><html><body>${htmlContent}</body><script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></html>`;
  }

  _onLoad = () => {
    alert('aaa')
    // const script = 'alert("Injected JS ")';
    // if (this.webview) {
    //   this.webview.injectJavaScript(script);
    // }
  }

  render() {
    return (
      <View style={{height:this.state.height}}>
        <WebView
          scalesPageToFit={false}
          javaScriptEnabled={true}
          style={styles.webView}
          source={{html: this._renderHtml()}}
          onNavigationStateChange={(title)=>{
            if(title.title != undefined) {
              this.setState({
                height:(parseInt(title.title)+20)
              })
            }
          }}
        />
      </View>
    );
  }
}

export default HtmlView;
