import React, { Component } from 'react';
import { View, Text } from 'react-native';


class Slide extends Component {
  render() {
    return (
      <View>
      <Text>
        {this.props.data.text}
      </Text>
      </View>
    );
  }
}


export default Slide;
