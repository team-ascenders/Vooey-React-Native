import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';


import TodoEmpty from '../assets/TodoEmpty.png';

export default class Todo extends Component {
  render() {
    let container = {
      flex: 1,
      justifyContent: 'center',
    }
    let image = {
      width: '100%',
      height: undefined,
      aspectRatio: 960 / 528
    }
    let text = {
      margin: 10,
      textAlign: 'center'
    }
    return (
      <View style={container}>
        <Image
          source={TodoEmpty} 
          style={image}/>
        <Title style={text}>
          A fresh start
        </Title>
        <Paragraph style={text}>
          Try talking to Vooey, and your to-do's will appear here
        </Paragraph>
      </View>
    );
  }
}
