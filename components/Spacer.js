import React, { Component } from 'react';
import { View } from 'react-native';

export default class Spacer extends Component {
  render() {
    const {horizontal, vertical} = this.props;
    const container = {
      height: vertical,
      width: horizontal
    }
    return (
      <View style={container} />
    );
  }
}
