import React, { Component } from 'react';
import { Image, ScrollView, View } from 'react-native';
import GravityView from '../components/GravityView';
import Transcripts from '../components/Transcripts';

export default class Explore extends Component {
  render() {
    let container = {
      flex: 1,
    }
    let gravityView = {
      flex: 1
    }

    return (
      <ScrollView style={container}>
        <GravityView style={gravityView} />
        <Transcripts
          handleItemTapped={() => this.props.navigation.push('Transcript')}
          title="In your words" />
      </ScrollView>
    );
  }
}
