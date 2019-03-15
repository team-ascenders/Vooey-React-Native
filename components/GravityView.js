import React, { Component } from 'react';
import { View } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import MatterAttractors from 'matter-attractors';

import Bubble from '../components/Bubble';

const Physics = (entities, { time }) => {
  let engine = entities["physics"].engine;
  Matter.Engine.update(engine, time.delta);
  return entities;
};

let boxIds = 0;

const CreateBox = (entities, { touches, screen }) => {
  let world = entities["physics"].world;
  let boxSize = Math.trunc(Math.max(screen.width, screen.height) * 0.075);
  touches.filter(t => t.type === "press").forEach(t => {
    let body = Matter.Bodies.rectangle(
      t.event.pageX,
      t.event.pageY,
      boxSize,
      boxSize,
      {
        frictionAir: 0.021,
        restitution: 1.0
      }
    );

    Matter.World.add(world, [body]);

    entities[++boxIds] = {
      body: body,
      size: [boxSize, boxSize],
      color: boxIds % 2 == 0 ? "pink" : "#B8E986",
      renderer: Bubble
    };
  });
  return entities;
};

export default class GravityView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewWidth: 100,
      viewHeight: 100,
      didLayout: false
    }
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
      flex: 1,
      backgroundColor: 'blue'
    }

    const { didLayout, viewWidth, viewHeight } = this.state;
    const boxSize = Math.trunc(Math.max(viewWidth, viewHeight) * 0.075);
    const initialBox = Matter.Bodies.rectangle(viewWidth / 2, viewHeight / 2, boxSize, boxSize);
    const floor = Matter.Bodies.rectangle(viewWidth / 2, viewHeight - boxSize / 2, viewWidth, boxSize, { isStatic: true });
    const engine = Matter.Engine.create({ enableSleeping: false });

    const world = engine.world;

    Matter.use(MatterAttractors);
    Matter.World.add(world, [initialBox, floor]);

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
            initialBox: {
              body: initialBox,
              size: [boxSize, boxSize],
              color: 'red',
              renderer: Bubble
            },
            floor: {
              body: floor,
              size: [viewWidth, boxSize],
              color: "green",
              renderer: Bubble
            }
          }}>
        </GameEngine>}
      </View>
    );
  }
}
