import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modalbox';

const styles = StyleSheet.create({

    wrapper: {
      paddingTop: 50,
      flex: 1
    },

    modal: {
      justifyContent: 'center',
      alignItems: 'center'
    },

    modal2: {
      height: 230,
      backgroundColor: "#3B5998"
    },

    modal3: {
      height: 300,
      width: 300
    },

    modal4: {
      height: 300
    },

    btn: {
      margin: 10,
      backgroundColor: "#3B5998",
      color: "white",
      padding: 10
    },

    btnModal: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 50,
      height: 50,
      backgroundColor: "transparent"
    },

    text: {
      color: "black",
      fontSize: 22
    }

  });

class Ceshi extends Component {

  static navigationOptions = {
    header: null
  }

  state = {  }
  render() {
    return (
      <View style={styles.wrapper}>
        <Modal
          isOpen={true}
          style={[styles.modal, styles.modal1]}
          ref={"modal1"}
          swipeToClose={true}
          onClosed={()=>{}}
          onOpened={()=>{}}
          onClosingState={()=>{}}>
            <Text style={styles.text}>Basic modal</Text>
        </Modal>
      </View>
    );
  }
}

export default Ceshi;
