import React, { Component } from 'react';
import { Alert, Image, Platform, ScrollView, StatusBar, View } from 'react-native';
import { Appbar, Button, Divider } from 'react-native-paper';
import { Transition } from 'react-navigation-fluid-transitions';

import Colors from '../assets/Colors';
import TranscriptText from '../assets/TranscriptText.png';
import Spacer from '../components/Spacer';

export default class Transcript extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  deleteButtonPressed = () => {
    Alert.alert(
      'Are you sure?',
      'The more information we collect the more personalized our recommendations are.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            this.props.navigation.goBack();
          }
        },
      ],
      { cancelable: false },
    );
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

    let transcript = {
      width: '80%',
      height: undefined,
      aspectRatio: 688 / 1180,
      alignSelf: 'center',
      marginTop: '10%'
    }

    let appbar = {
      backgroundColor: Colors.blue
    }

    let deleteButton = {
      width: '50%',
      alignSelf: 'center'
    }

    return (
      <View style={container}>
        <View style={headerContainer}>
          <StatusBar backgroundColor={Colors.blue} barStyle="light-content" translucent />
          <Appbar.Header style={appbar}>
            <Transition appear="scale">
              <Appbar.Action color="white" icon="arrow-back" onPress={() => this.props.navigation.goBack()} />
            </Transition>
            <Appbar.Content
              color="white"
              title="Transcript"
              subtitle="05/09/19 at 10:00 AM"
            />
          </Appbar.Header>
          <Divider />
        </View>
        <ScrollView style={scrollView}>
          <Image
            resizeMode='contain'
            source={TranscriptText}
            style={transcript} />
          <Spacer vertical={20} />
          <Button
            color={Colors.blue}
            dark={true}
            mode="contained"
            style={deleteButton}
            onPress={this.deleteButtonPressed}>
            Delete
          </Button>
          <Spacer vertical={20} />
        </ScrollView>
      </View>
    );
  }
}
