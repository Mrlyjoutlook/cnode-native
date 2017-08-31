import React, { Component } from 'react';
import { Modal, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import AnimateIcon from './AnimateIcon';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    position: 'absolute',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    top: '50%',
    marginTop: -50,
    left: '50%',
    marginLeft: -50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class LoadModal extends Component {

  static defaultProps = {
    visible: false
  }

  state = {
    visible: this.props.visible
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (visible !== this.props.visible) this.setState({ visible });
  }

  render() {
    const { visible } = this.props;
    return (
      <Modal
        visible={visible}
        animationType="none"
        transparent = {true}
        onRequestClose={()=> {}}
      >
        <View style={styles.modalBackground}>
          <View style={styles.content}>
            <AnimateIcon />
          </View>
        </View>
      </Modal>
    );
  }
}

export default LoadModal;
