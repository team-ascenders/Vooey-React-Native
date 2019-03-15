import React, { Component } from 'react';
import { View } from 'react-native';
import { Divider, Paragraph, Text, TouchableRipple } from 'react-native-paper';

import Colors from '../assets/Colors';

export default class TranscriptItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const foreground = {
      backgroundColor: 'white',
      borderRadius: this.props.rounded ? 10 : 0
    }

    const foregroundContainer = {
      height: 130,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 35,
    }

    const timeHeader = {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    }

    const dateText = {
      fontSize: 18,
    }

    const timeText = {
      fontSize: 14,
      color: Colors.gray
    }

    const transcriptText = {
      fontSize: 14,
      color: Colors.gray
    }

    let { transcript } = this.props;
    let date = new Date(transcript.timestamp * 1000);
    let hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let timeSuffix = date.getHours() >= 12 ? "PM" : "AM";
    return (
      <TouchableRipple
        style={foreground}
        onPress={this.props.handleRowTapped}
        rippleColor="rgba(200, 200, 200, 1)">
        <View>
          <View style={foregroundContainer}>
            <View style={timeHeader}>
              <Text style={dateText}>
                {date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()}
              </Text>
              <Text style={timeText}>
                {hour + ':' + date.getMinutes() + ' ' + timeSuffix}
              </Text>
            </View>
            <Paragraph style={transcriptText}>
              {transcript.text}
            </Paragraph>
          </View>
          <Divider />
        </View>
      </TouchableRipple>
    );
  }
}