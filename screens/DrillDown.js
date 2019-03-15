import React, { Component } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { List, Divider } from 'react-native-paper';
import Colors from '../assets/Colors';

export default class DrillDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let container = {
      flex: 1,
    }
    return (
      <ScrollView style={container}>
      </ScrollView>
    );
  }
}
