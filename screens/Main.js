import React, { Component } from 'react';
import { Alert, Image, Platform, SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Transition } from 'react-navigation-fluid-transitions';

import Colors from '../assets/Colors';
import GoogleMic from '../assets/Google_mic.svg.png';
import Home from './Home';
import Explore from './Explore';
import Settings from './Settings';
import Todo from './Todo';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // TODO: CHANGE THIS
      selectedScreen: 0,
      segmentHeight: 0
    }
  }

  handleSegmentLayout = (e) => {
    this.setState({ segmentHeight: e.nativeEvent.layout.height });
  }

  handleSearchIconTapped = () => {
    Alert.alert(
      'Error',
      'Search is disabled in this build.',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

  titleForIndex = () => {
    switch (this.state.selectedScreen) {
      case 0: return "Home"
      case 1: return "To-do"
      case 2: return "Explore"
      case 3: return "Settings"
    }
  }

  currentContentView = () => {
    switch (this.state.selectedScreen) {
      case 0: return <Home navigation={this.props.navigation} />
      case 1: return <Todo />
      case 2: return <Explore navigation={this.props.navigation} />
      case 3: return <Settings navigation={this.props.navigation} />
    }
  }

  handleMic = () => {
    this.props.navigation.navigate('Puppet');
  }

  handleKeyboard = () => {
    Alert.alert(
      'Error',
      'Keyboard entry is disabled in this build.',
      [
        {text: 'OK'},
      ],
      {cancelable: false},
    );
  }

  render() {
    let { selectedScreen, segmentHeight } = this.state;
    let segmentIconSize = 24;

    let container = {
      flex: 1,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: 'white'
    };

    let bottom = {
      justifyContent: 'center'
    };

    let appbar = {
      justifyContent: 'space-around',
    };

    let segmentContainer = {
      flexDirection: 'row',
      borderRadius: segmentHeight / 2,
      alignItems: 'center',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 15,
      paddingRight: 15,

      backgroundColor: 'white',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowRadius: 4,
      shadowOpacity: 0.2
    };

    let keyboard = {
      width: segmentIconSize,
      height: segmentIconSize,
    };

    let googleMic = {
      width: segmentIconSize,
      height: segmentIconSize,
      marginLeft: 25,
    };

    let googleMicInternal = {
      width: '100%',
      height: '100%'
    }

    let headerContainer = {
      zIndex: 1000
    }

    return (
      <View style={container}>
        <View style={headerContainer}>
          <StatusBar backgroundColor={Colors.transparent} barStyle="dark-content" translucent />
          <Appbar.Header>
            <Appbar.Content title={this.titleForIndex()} />
            <Appbar.Action icon="search" onPress={this.handleSearchIconTapped} />
          </Appbar.Header>
          <Divider />
        </View>
        {this.currentContentView()}
        <Transition 
          appear="bottom"
          style={bottom}>
          <Appbar style={appbar}>
            <Appbar.Action
              color={selectedScreen == 0 ? Colors.blue : Colors.gray}
              icon="home"
              onPress={() => this.setState({ selectedScreen: 0 })} />
            <Appbar.Action
              color={selectedScreen == 1 ? Colors.blue : Colors.gray}
              icon="list"
              onPress={() => this.setState({ selectedScreen: 1 })} />
            <View
              elevation={3}
              onLayout={this.handleSegmentLayout}
              style={segmentContainer}>
              <Icon
                name="keyboard"
                color={Colors.gray}
                size={segmentIconSize}
                style={keyboard}
                onPress={() => this.handleKeyboard()} />
              <TouchableOpacity
                style={googleMic}
                onPress={() => this.handleMic()}>
                <Image
                  resizeMode='contain'
                  source={GoogleMic}
                  style={googleMicInternal} />
              </TouchableOpacity>
            </View>
            <Appbar.Action
              color={selectedScreen == 2 ? Colors.blue : Colors.gray}
              icon="bubble-chart"
              onPress={() => this.setState({ selectedScreen: 2 })} />
            <Appbar.Action
              color={selectedScreen == 3 ? Colors.blue : Colors.gray}
              icon="settings"
              onPress={() => this.setState({ selectedScreen: 3 })} />
          </Appbar>
        </Transition>
      </View>
    );
  }
}
