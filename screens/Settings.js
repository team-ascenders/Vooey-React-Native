import React, { Component } from 'react';
import { Linking, ScrollView, Text, View } from 'react-native';
import { List, Switch, Divider } from 'react-native-paper';
import Colors from '../assets/Colors';
import Transcripts from '../components/Transcripts';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  settingsItems = () => {
    const link = {
      textAlign: 'center',
      color: Colors.blue,
      padding: 20
    }

    return (
      <View>
        <List.Section>
          <List.Subheader>General</List.Subheader>
          <Divider />
          <List.Item
            title="Location"
            right={() => <Switch color={Colors.blue} value={true} />} />
          <List.Item
            title="Microphone"
            right={() => <Switch color={Colors.blue} value={true} />} />
          <List.Item
            title="Backup my data"
            right={() => <Switch color={Colors.blue} value={true} />} />
        </List.Section>
        <List.Section>
          <List.Subheader>Connected Devices</List.Subheader>
          <Divider />
          <List.Item
            title="Android Auto"
            right={() => <Switch color={Colors.blue} value={true} />} />
          <List.Item
            title="Google Assistant"
            right={() => <Switch color={Colors.blue} value={true} />} />
          <List.Item
            title="Google Home"
            right={() => <Switch color={Colors.blue} value={true} />} />
          <List.Item
            title="Google Wear"
            right={() => <Switch color={Colors.blue} value={true} />} />
        </List.Section>
        <List.Section>
          <List.Subheader>Privacy Statement</List.Subheader>
          <Divider />
          <Text
            style={link}
            onPress={() => Linking.openURL('https://safety.google')}>
            Google Privacy Statement
          </Text>
        </List.Section>
      </View>
    )
  }
  render() {
    let container = {
      flex: 1,
    }
    return (
      <ScrollView style={container}>
        {this.settingsItems()}
        <Transcripts
          handleItemTapped={() => this.props.navigation.push('Transcript')}
          title="All Transcripts" />
      </ScrollView>
    );
  }
}
