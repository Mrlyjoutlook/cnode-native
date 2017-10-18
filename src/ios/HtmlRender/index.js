import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, NativeModules, requireNativeComponent } from 'react-native';

const RCTHtmlView = requireNativeComponent('RCTHtmlView', null);
const styles = {
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16
  },
}

class HtmlRender extends Component {
  static propTypes = {
    content: PropTypes.string,
    onChange: PropTypes.func,
    onClickUserLink: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  _onChange = (event) => {
    this.props.onChange(event.nativeEvent);
  }
  _onClickUserLink = (event) => {
    this.props.onClickUserLink(event.nativeEvent);
  }

  render(){
    const { content, style } = this.props;
    return(
      <RCTHtmlView
        content={content}
        style={[styles.container, style]}
        onChange={this._onChange}
        onClickUserLink={this._onClickUserLink}
      >
      </RCTHtmlView>
    )
  }
}

export default HtmlRender;
