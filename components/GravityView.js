import React, { Component } from 'react';
import { View } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import MatterAttractors from 'matter-attractors';
import PubNubReact from 'pubnub-react';

import Bubble from '../components/Bubble';
import PuppetProvider from '../providers/PuppetProvider';
import Colors from '../assets/Colors';

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

let boxIds = 0;

export default class GravityView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewWidth: 100,
      viewHeight: 100,
      didLayout: false,
    }

    this.currentWords = 0;
  }

  updateDimensions = (event) => {
    this.setState({
      viewHeight: event.nativeEvent.layout.height,
      viewWidth: event.nativeEvent.layout.width,
      didLayout: true
    });
  }

  render() {
    let container = {
      width: '100%',
      height: undefined,
      aspectRatio: 0.8,
    }
    const variance = 200;
    const bubbleBase = 100;
    const bubbleVariance = 20;

    const { didLayout, viewWidth, viewHeight } = this.state;

    const floor1 = Matter.Bodies.rectangle(viewWidth / 2, viewHeight + 0.5, viewWidth, 1, { isStatic: true });
    const floor2 = Matter.Bodies.rectangle(viewWidth / 2, -0.5, viewWidth, 1, { isStatic: true });
    const floor3 = Matter.Bodies.rectangle(-0.5, viewHeight / 2, 1, viewHeight, { isStatic: true });
    const floor4 = Matter.Bodies.rectangle(viewWidth + 0.5, viewHeight / 2, 1, viewHeight, { isStatic: true });

    const engine = Matter.Engine.create({ enableSleeping: false });

    this.engine = engine;

    const world = engine.world;

    world.gravity.x = 0
    world.gravity.y = 0

    Matter.use(MatterAttractors);
    Matter.World.add(world, [floor1, floor2, floor3, floor4]);

    const CreateBox = (entities, { touches, screen }) => {
      let world = entities["physics"].world;
      let boxSize = bubbleBase + Math.floor(Math.random() * 2 * bubbleVariance);
      var bodies = []

      if (PuppetProvider.terms.length > this.currentWords) {
        let body = Matter.Bodies.circle(
          viewWidth / 2 + Math.floor(Math.random() * 2 * variance) - variance,
          viewHeight / 2 + Math.floor(Math.random() * 2 * variance) - variance,
          boxSize / 2,
          {
            frictionAir: 0.021,
            restitution: 1.0,
            plugin: {
              attractors: [
                function (bodyA, bodyB) {
                  if (!bodyA.isCircle || !bodyB.isCircle) { return { x: 0, y: 0 }; }

                  var avgX = (bodyA.position.x + bodyB.position.x - viewWidth) / 2;
                  var avgY = (bodyA.position.y + bodyB.position.y - viewHeight) / 2;

                  return {
                    x: (bodyA.position.x - bodyB.position.x - avgX) * 2e-6,
                    y: (bodyA.position.y - bodyB.position.y - avgY) * 2e-6,
                  };
                }
              ]
            }
          }
        );

        entities[++boxIds] = {
          body: body,
          size: [boxSize, boxSize],
          color: PuppetProvider.terms[this.currentWords],
          renderer: Bubble
        };

        body.isCircle = true;
        bodies.push(body);
        this.currentWords++;
      }

      Matter.World.add(world, bodies);

      return entities;
    };

    return (
      <View
        onLayout={this.updateDimensions}
        style={container}>
        {didLayout && <GameEngine
          systems={[Physics, CreateBox]}
          entities={{
            physics: {
              engine: engine,
              world: world
            },
          }}
          style={{ flex: 1 }}>
        </GameEngine>}
      </View>
    );
  }
}
