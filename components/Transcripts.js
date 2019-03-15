import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Divider, Text, TouchableRipple } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../assets/Colors';
import PuppetProvider from '../providers/PuppetProvider';
import TranscriptItem from './TranscriptItem';

export default class Transcripts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcripts: PuppetProvider.transcripts,
      openRow: -1,
      showRed: false
    }
  }

  componentDidMount() {
    setTimeout(()=>{this.setState({ showRed: true })}, 1000);
  }

  handleRowDelete = (index) => {
    Alert.alert(
      'Are you sure?',
      'The more information we collect the more personalized our recommendations are.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            PuppetProvider.removeTranscript(index);
            this.setState({ openRow: -1, transcripts: PuppetProvider.transcripts });
          }
        },
      ],
      { cancelable: false },
    );
    this.listView.safeCloseOpenRow();
  }

  handleRowTapped = (index) => {
    this.props.handleItemTapped(index);
  }

  viewBackground = () => {
    const background = {
      flex: 1,
    }

    const backgroundContainer = {
      backgroundColor: this.state.showRed ? Colors.red : 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }

    const leftContainer = {
      width: 130,
      justifyContent: 'center',
      alignItems: 'center',
    }

    const rightContainer = {
      width: 130,
      justifyContent: 'center',
      alignItems: 'center',
    }

    return (
      <TouchableRipple
        onPress={this.handleRowDelete}
        style={background}>
        <View style={backgroundContainer}>
          <View style={leftContainer}>
            <Icon
              name='delete'
              color='white'
              size={30} />
          </View>
          <View style={rightContainer}>
            <Icon
              name='delete'
              color='white'
              size={30} />
          </View>
        </View>
      </TouchableRipple>
    )
  }

  handleRowOpen = (key) => {
    this.setState({ openRow: key });
  }

  handleRowClose = () => {
    this.setState({ openRow: -1 })
  }

  render() {
    let { transcripts } = this.state;

    let container = {
      marginTop: 30
    }

    let title = {
      color: Colors.gray,
      fontSize: 14,
      marginLeft: 20,
      marginBottom: 10,
    }

    return (
      <View style={container}>
        <Text style={title}>
          {this.props.title}
        </Text>
        <Divider />
        <SwipeListView
          useFlatList
          data={transcripts}
          ref={(ref) => this.listView = ref}
          renderItem={(data, rowMap) =>
            <TranscriptItem
              handleRowTapped={() => this.handleRowTapped(data.index)}
              rounded={this.state.openRow == data.index}
              transcript={data.item} />}
          renderHiddenItem={this.viewBackground}
          leftOpenValue={130}
          rightOpenValue={-130}
          onRowOpen={this.handleRowOpen}
          onRowClose={this.handleRowClose}
          closeOnScroll={false}
          keyExtractor={(item, index) => index.toString()} />
      </View>
    );
  }
}
