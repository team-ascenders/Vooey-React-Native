import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Colors from '../assets/Colors';


export default class TitleCard extends Component {
  render() {
    let container = {
      flex: 1,
      margin: 10,
    }

    let card = {
      width: '100%'
    }

    let cardTitle = {
      color: Colors.gray,
      fontSize: 14,
      marginBottom: 10,
      marginLeft: 10,
    }

    return (
      <View style={container}>
        <Text style={cardTitle}>
          {this.props.title}
        </Text>
        <Card
          elevation={2}
          style={card}>
          {this.props.children}
        </Card>
      </View>
    );
  }
}
