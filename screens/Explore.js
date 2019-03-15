import React, { Component } from 'react';
import { Image, ScrollView, View } from 'react-native';
import GravityView from '../components/GravityView';

import BubblesStatic from '../assets/Bubbles-Static.png';
import Transcripts from '../components/Transcripts';

export default class Explore extends Component {
  render() {
    let container = {
      flex: 1,
    }
    let gravityView = {
    }

    let bubblesStatic = {
      width: '90%',
      height: undefined,
      aspectRatio: 774 / 1574,
      alignSelf: 'center'
    }

    return (
      <ScrollView style={container}>
        {/* <GravityView style={gravityView}>
        </GravityView> */}
        <Image
          resizeMode='contain'
          source={BubblesStatic}
          style={bubblesStatic} />
        <Transcripts
          handleItemTapped={() => this.props.navigation.push('Transcript')}
          title="In your words" />
      </ScrollView>
    );
  }
}
