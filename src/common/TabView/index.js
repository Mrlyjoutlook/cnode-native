import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from '../ListItem';
import Refresh from '../Refresh';

class TabView extends Component {

  static defaultProps = {
    data: [],
    source: {}
  }

  state = { loading: false }

  _keyExtractor = (item, index) => item;

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if(data.length !==0 & (!this.props.data.length || this.props.data)) this.setState({ loading: true });
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
          loading ?
            <FlatList
              tabLabel="全部"
              data={data}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => <ListItem data={source[item]} onPress={this._handleClick} />}
            /> : <Refresh/>
        }
      </View>
    );
  }
}

export default TabView;
