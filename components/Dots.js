import React, { Component } from 'react';
import { View } from 'react-native';

import Colors from '../assets/Colors';

export default class Dot extends Component {
  getDots = (num, selected) => {
    var dots = [];
    const dotWidth = 12;
    const dotMargin = 6

    for (var i = 0; i < num; i ++) {
      const style = {
        width: dotWidth,
        height: dotWidth,
        borderRadius: dotWidth/2,
        margin: dotMargin,
        backgroundColor: i == selected ? Colors.darkBlue : Colors.lightGray
      };

      dots.push(
        <View
          key={i}
          style={style}/>
      )
    }

    return dots;
  }
  render() {
    const {length, selected} = this.props;
    const container = {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 12,
    }
    return (
      <View style={container}>
        {this.getDots(length, selected)}
      </View>
    );
  }
}
