import React, { Component } from 'react';
import { Image, Platform, ScrollView, StatusBar, View } from 'react-native';
import { Appbar, List, Divider, Title, Paragraph } from 'react-native-paper';
import { Transition } from 'react-navigation-fluid-transitions';

import Colors from '../assets/Colors';
import Positivity from '../assets/Positivity.png';
import Transcripts from '../components/Transcripts';

export default class DrillDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    let container = {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
    let scrollView = {
      flex: 1,
    }
    let headerContainer = {
      zIndex: 1000
    }

    const centerText = {
      textAlign: 'center'
    }

    const titleContainer = {
      paddingLeft: 30,
      paddingRight: 30,
      marginTop: 35,
    }

    const positivity = {
      width: '100%',
      height: undefined,
      aspectRatio: 824/330,
      marginTop: 50,
    }

    return (
      <View style={container}>
        <View style={headerContainer}>
          <StatusBar backgroundColor='white' barStyle="dark-content" translucent />
          <Appbar.Header>
            <Transition appear="scale">
              <Appbar.Action icon="arrow-back" onPress={() => this.props.navigation.goBack(null)} />
            </Transition>
          </Appbar.Header>
          <Divider />
        </View>
        <ScrollView style={scrollView}>
          <Transition shared="vooey-question">
            <View style={titleContainer}>
              <Title style={centerText}>Vooey asked,</Title>
              <Paragraph style={centerText}>
                “How do you feel about your work life balance?”
              </Paragraph>
            </View>
          </Transition>
          <Image
            resizeMode='contain'
            source={Positivity}
            style={positivity} />
          <Transcripts
            handleItemTapped={()=>this.props.navigation.push('Transcript')}
            title="In your words" />
        </ScrollView>
      </View>
    );
  }
}
