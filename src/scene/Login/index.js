import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Animated, View, Text, StyleSheet, Dimensions, TextInput, Button } from 'react-native';
import theme from '../../config/styles';
import Radio from '../../common/Radio';
import { goBack } from '../../redux/actions';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.backgroundColor,
    width,
    height,
    paddingTop: height / 8,
    alignItems: 'center',
    // justifyContent: 'center'
  },
  textInput: {
    width: 2 * width / 3,
    height: 40,
    borderColor: theme.color_d0e9ff,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: height / 14,
    marginBottom: 5,
    color: '#fff',
    paddingLeft: 5
  },
  content_bottom: {
    position: 'absolute',
    bottom: 5,
  },
  attach: {
    marginTop: 30,
    color: theme.color_d0e9ff
  }
});

class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  state = {}

  handleLogin = () => {
    const { dispatch } = this.props;
    dispatch(goBack());
  }

  handleGoBack = () => {
    const { dispatch } = this.props;
    dispatch(goBack());
  }

  handleOnChangeText = () => {

  }

  render() {
    return (
      <View style={styles.content}>
        <Text style={{ color: theme.color_fff, fontSize: theme.text_48 }}>Cnode</Text>
        <Text style={{ color: theme.color_fff, fontSize: theme.text_24 }}>Welcome!</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleOnChangeText}
        />
        <Radio
          text="记住 Access Token"
        />
        <Button
          onPress={this.handleLogin}
          title="Login"
          color="#d0e9ff"
        />
        <View style={styles.content_bottom}>
          <Button
            onPress={this.handleGoBack}
            title="Go Back"
            color="#d0e9ff"
          />
          <Text style={styles.attach}>cnode by mrlyj</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    accesstoken: state.userState.get('accesstoken')
  }
}

export default connect(mapStateToProps)(Login);
