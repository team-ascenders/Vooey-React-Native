import React, { Component } from 'react';
import { Image, Platform, ScrollView, StatusBar, View } from 'react-native';
import { Appbar, FAB, Text } from 'react-native-paper';
import { Transition } from 'react-navigation-fluid-transitions';
import Voice from 'react-native-voice';

import Colors from '../assets/Colors';
import PuppetProvider from '../providers/PuppetProvider';


export default class MeditationArticle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversation: [
        { speaker: 'vooey', text: 'Hi! What would you like to talk about today?' }
      ],
      vooeyThinking: false,
      meTalking: false,
      currentUtterance: ''
    }

    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  }

  onSpeechStartHandler = (e) => {
    console.log("start");
  }

  onSpeechEndHandler = (e) => {
    console.log("stop");

    let conversation = this.state.conversation;

    conversation.push({
      speaker: 'me',
      text: this.state.currentUtterance
    });

    this.setState({ conversation: conversation, currentUtterance: '', vooeyThinking: true, meTalking: false });
  }

  onSpeechResultsHandler = (e) => {
    let utterance = e.value[0];

    if (this.timeout) { clearTimeout(this.timeout) }

    this.timeout = setTimeout(() => Voice.stop(), 3000);

    this.setState({ currentUtterance: utterance });
  }

  startTalking = () => {
    Voice.start('en-US');
    this.setState({meTalking: true})
  }

  componentDidMount() {
    this.startTalking()
    PuppetProvider.speechDelegate = this;
  }

  handleReceived(message) {
    let text = message.text;
    let conversation = this.state.conversation;

    conversation.push({
      speaker: 'vooey',
      text: text
    });

    this.setState({ conversation: conversation, vooeyThinking: false });
  }

  getSpeechBubbles = () => {
    var views = [];

    var left = {
      alignSelf: 'flex-start',
      backgroundColor: Colors.blue,
      padding: 10,
      margin: 20,
      borderRadius: 10,
    }

    var leftThinking = {
      alignSelf: 'flex-start',
      backgroundColor: Colors.lightGray,
      padding: 10,
      margin: 20,
      borderRadius: 10,
    }

    var right = {
      alignSelf: 'flex-end',
      backgroundColor: Colors.gray,
      padding: 10,
      margin: 20,
      borderRadius: 10,
    }

    var me = {
      alignSelf: 'flex-end',
      backgroundColor: Colors.lightGray,
      padding: 10,
      margin: 20,
      borderRadius: 10,
    }

    for (var i = 0; i < this.state.conversation.length; i++) {
      var speech = this.state.conversation[i];

      if (speech.text.length > 0) {
        views.push(<View style={speech.speaker == 'me' ? right : left}>
          <Text style={{ color: 'white' }}>
            {speech.text}
          </Text>
        </View>)
      }

    }

    if (this.state.currentUtterance.length > 0) {
      views.push(
        <View style={me}>
          <Text>
            {this.state.currentUtterance}
          </Text>
        </View>
      );
    }

    if (this.state.vooeyThinking) {
      views.push(
        <View style={leftThinking}>
          <Text fontStyle="italic" color="white">
            I'm thinking...
          </Text>
        </View>
      );
    }

    return views;
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

    let appbar = {
      backgroundColor: Colors.transparent
    }

    let speechbutton = {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 20,
      backgroundColor: Colors.blue
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
          {this.getSpeechBubbles()}
        </ScrollView>
        {!this.state.meTalking 
        && <FAB
        color='white'
        small={false}
        style={speechbutton}
        icon="mic"
        onPress={() => this.startTalking()}
      />}
      </View>
    );
  }
}
