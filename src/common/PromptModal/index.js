import React, { Component } from 'react';
import { Modal, TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    width: width * 0.7,
    backgroundColor: '#fff',
    borderRadius: 8,
    top: '30%',
    left: '50%',
    transform: [{ translateX: -(width * 0.7) / 2 }],
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
  },
  content_title: {
    fontSize: 20,
    paddingBottom: 10
  },
  content_text: {
    paddingTop: 10,
    paddingBottom: 10
  },
  content_btn: {
    width: width * 0.7 - 40,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15
  },
  btn: {
    fontSize: 16
  }
});

class PromptModal extends Component {

  static defaultProps = {
    visible: false,
    title: 'warn',
    content: 'please add message!',
    btnFunc: ()=>{},
    btn: [{
      text: 'Close', onPress: () => { }
    }],
  }

  state = {
    visible: this.props.visible
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (visible !== this.props.visible) this.setState({ visible });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { visible, title, content, btn } = nextProps;
    return visible !== this.props.visible ||
      title !== this.props.title ||
      content !== this.props.content ||
      btn.length !== this.props.btn.length ||
      nextState.visible !== this.state.visible
  }

  _onClose = () => {

  }

  _onPress = (func) => {
    return (e) => {
      this.props.btnFunc();
      func();
    }
  }

  render() {
    const { visible } = this.state;
    const { title, content, btn } = this.props;
    return (
      <Modal
        visible={visible}
        animationType="none"
        transparent={true}
        onRequestClose={() => {this._onClose}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.content}>
            <Text numberOfLines={1} style={styles.content_title}>{title}</Text>
            <Text style={styles.content_text}>{content}</Text>
            <View style={styles.content_btn}>
              {
                btn.map((item, i) => (
                  <TouchableOpacity key={i} onPress={this._onPress(item.onPress)}>
                    <Text style={styles.btn}>{item.text}</Text>
                  </TouchableOpacity>
                ))
              }
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default PromptModal;
