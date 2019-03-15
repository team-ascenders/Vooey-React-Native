import React, { Component } from 'react';
import { View } from 'react-native';

export default class Puppet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyboardEnabled: props.keyboardEnabled
    }
  }
  render() {
    let container = {
      flex: 1
    }
    
    return (
      <View style={container} />
    );
  }
}
