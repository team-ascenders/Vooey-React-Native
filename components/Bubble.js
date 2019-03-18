
import React, { Component } from "react";
import { Animated } from "react-native";
import { array, object, string } from 'prop-types';

import { Bodies } from 'matter-js';
import { Text, TouchableRipple } from "react-native-paper";

import Colors from '../assets/Colors';

export default class Bubble extends Component {
  constructor(props) {
    super(props)

    this.state = {
      opacity: new Animated.Value(0)
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.opacity,
      {
        toValue: 1,
        delay: Math.floor(Math.random() * 500)
      },
    ).start();
  }

  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const term = this.props.color;

    var color = Colors.blue;
    var sentiment = term.sentiment;

    if (sentiment == 1) { color = Colors.green }
    else if (sentiment == 2) { color = Colors.red }

    return (
      <Animated.View opacity={this.state.opacity}>
        <TouchableRipple
          onPress={() => console.log("asdf")}
          rippleColor="white"
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            backgroundColor: color,
            borderRadius: width / 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ textAlign: 'center', color: 'white', fontSize: 14, fontWeight: 'bold' }}>{term.word}</Text>
        </TouchableRipple>
      </Animated.View>
    );
  }
}

Bubble.propTypes = {
  size: array,
  body: object,
  color: string
}