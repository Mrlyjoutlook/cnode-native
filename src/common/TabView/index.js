import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Spinner from "react-native-spinkit";
import ListItem from '../ListItem';
import Refresh from '../Refresh';

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200
  }
});

class TabView extends Component {

  static defaultProps = {
    data: [],
    source: {}
  }

  state = { loading: false }

  _keyExtractor = (item, index) => item;

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data.length !== 0 & (!this.props.data.length || this.props.data)) this.setState({ loading: true });
  }

  _handleClick = (id) => {
    this.props.click(id);
  }

  render() {
    const { data, source } = this.props;
    const { loading } = this.state;
    return (
      <View>
        {
          loading &&
          <FlatList
            tabLabel="全部"
            data={data}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => <ListItem data={source.get(item)} onPress={this._handleClick} />}
          />
        }
        <View style={styles.spinner}>
          <Spinner
            isVisible={!loading}
            size={37}
            type="Wave"
            color="#00bcd4"
          />
        </View>
      </View>
    );
  }
}

export default TabView;
