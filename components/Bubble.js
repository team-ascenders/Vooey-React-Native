
import React, { Component } from "react";
import { View } from "react-native";
import { array, object, string } from 'prop-types';

import { Bodies } from 'matter-js';

export default class Bubble extends Component {
  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    
    var attractiveBody = Bodies.circle(
      50,
      50,
      50, 
      {
      isStatic: false,
  
      // example of an attractor function that 
      // returns a force vector that applies to bodyB
      plugin: {
        attractors: [
          function(bodyA, bodyB) {
            return {
              x: (bodyA.position.x - bodyB.position.x) * 1e-6,
              y: (bodyA.position.y - bodyB.position.y) * 1e-6,
            };
          }
        ]
      }
    });

    return (attractiveBody);
  }
}

Bubble.propTypes = {
    size: array,
    body: object, 
    color: string
}