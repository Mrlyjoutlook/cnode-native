import React, { Component } from 'react';
import { connect } from 'react-redux';
import { is } from 'immutable';
import { View, Text, StyleSheet, Dimensions, TextInput, Button } from 'react-native';
import theme from '../../config/styles';
import Radio from '../../common/Radio';
import { SIGN_IN, REMEMBER_TOKEN, goBack } from '../../redux/actions';

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
    padding: 0
  },
  content_bottom: {
    position: 'absolute',
    bottom: 5,
  },
  attach: {
    marginTop: 30,
    color: theme.color_d0e9ff
  },
});

class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    header: null
  })

  state = {
    text: this.props.rememberToken ? this.props.accesstoken : '',
  }

  componentWillReceiveProps(nextProps) {
    const { accesstoken } = nextProps;
    if (!is(accesstoken, this.props.accesstoken)) this.setState({ text: accesstoken });
  }

  handleLogin = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    dispatch({ type: SIGN_IN, data: text });
  }

  handleGoBack = () => {
    const { dispatch } = this.props;
    dispatch(goBack());
  }

  handleClickRadio = (bool) => {
    const { dispatch } = this.props;
    if (bool) dispatch({ type: REMEMBER_TOKEN, state: bool });
  }

  handleOnChangeText = (text) => {
    this.setState({ text });
  }

  render() {
    const { text } = this.state;
    const { rememberToken } = this.props;
    return (
      <View style={styles.content}>
        <Text style={{ color: theme.color_fff, fontSize: theme.text_48 }}>Cnode</Text>
        <Text style={{ color: theme.color_fff, fontSize: theme.text_24 }}>Welcome!</Text>
        <TextInput
          value={text}
          style={styles.textInput}
          onChangeText={this.handleOnChangeText}
          // multiline = {true}  // 某些样式属性需要启用此属性才会生效
          underlineColorAndroid="transparent"  // android 去掉底边框
        />
        <Radio
          value=""
          text="记住 Access Token"
          defaultCheck={rememberToken}
          onChange={this.handleClickRadio}
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
        <Modal
          isOpen={true}
          onClosed={() => {}}
          style={[styles.modal, styles.modal4]}
          position={"center"}
          backdropContent={BContent}
        >
          <Text style={styles.text}>Modal with backdrop content</Text>
        </Modal>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    accesstoken: state.userState.get('accesstoken'),
    rememberToken: state.userState.get('rememberToken')
  }
}

export default connect(mapStateToProps)(Login);
