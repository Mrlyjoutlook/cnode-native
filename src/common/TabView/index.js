import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import ListItem from '../ListItem';
import Refresh from '../Refresh';

class TabView extends Component {

  static defaultProps = {
    data: []
  }

  state = { loading: false }

  _keyExtractor = (item, index) => item.id;

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if(data.length !==0 & this.props.data.length === 0) this.setState({ loading: true });
  }

  _handleClick = (id) => {
    this.props.click(id);
  }

  render() {
    const { data } = this.props;
    const { loading } = this.state;
    return (
      <View>
        {
          loading ?
            <FlatList
              tabLabel="全部"
              data={data}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => <ListItem data={item} onPress={this._handleClick} />}
            /> : <Refresh/>
        }
      </View>
    );
  }
}

export default TabView;
