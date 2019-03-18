import React, { Component } from 'react';
import { Image, Platform, ScrollView, StatusBar, View } from 'react-native';
import { Appbar, Title, Paragraph } from 'react-native-paper';
import { Transition } from 'react-navigation-fluid-transitions';

import Colors from '../assets/Colors';

import WorkingParents from '../assets/working-parents.jpg';

export default class Transcript extends Component {
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

    let appbar = {
      backgroundColor: Colors.transparent
    }

    const parentCover = {
      width: '100%',
      height: undefined,
      aspectRatio: 700 / 393
    }

    const textContainer = {
      margin: 20,
    }

    return (
      <View style={container}>
        <View style={headerContainer}>
          <StatusBar backgroundColor="white" barStyle="dark-content" translucent />
          <Appbar.Header style={appbar}>
            <Transition appear="scale">
              <Appbar.Action icon="arrow-back" onPress={() => this.props.navigation.goBack()} />
            </Transition>
          </Appbar.Header>
        </View>
        <ScrollView style={scrollView}>
          <Transition shared="parentImage">
            <View>
              <Image
                fadeDuration={0}
                resizeMode='contain'
                source={WorkingParents}
                style={parentCover} />
            </View>
          </Transition>

          <View style={textContainer}>
            <Transition shared="parentTitle">
              <Title >Mindful Tips for Working Parents</Title>
            </Transition>
            <Transition shared="parentParagraph">
              <View>
                <Paragraph >
                  Setting aside time for formal meditation is an important way to establish a routine and get comfortable with the practice. Even just a few minutes a day can make a big difference.
                </Paragraph>
                <Paragraph>
                  “Some people complain about taking time out of their day,” said Atman Smith, who teaches meditation to underserved communities in Baltimore. “Practice is important though. It’s a tool you can use to bring yourself back to the present in stressful situations.”
                </Paragraph>
                <Paragraph>
                  But we shouldn’t stop being mindful when we stop meditating. “The purpose of mindfulness meditation is to become mindful throughout all parts of our life, so that we’re awake, present and openhearted in everything we do,” said Tara Brach, a popular meditation teacher based near Washington, D.C. “Not just when we’re sitting on the cushion.”
                </Paragraph>
                <Paragraph>
                  Mindfulness meditation isn’t about letting your thoughts wander. But it isn’t about trying to empty your mind, either. Instead, the practice involves paying close attention to the present moment — especially our own thoughts, emotions and sensations — whatever it is that’s happening.
                </Paragraph>
                <Paragraph>
                  In addition to basic meditation instructions, we’ve compiled guided meditations for a few popular
            </Paragraph>
              </View>
            </Transition>
          </View>
        </ScrollView>
      </View >
    );
  }
}
