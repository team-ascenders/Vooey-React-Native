import React, { Component } from 'react';
import { Image, ScrollView, RefreshControl } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Dimensions from 'Dimensions';

import GoodAfternoon from '../assets/GoodAfternoon.png';
import ArticleCard from '../assets/ArticleCard.png';
import Colors from '../assets/Colors';
import TitleCard from '../components/TitleCard';
import Spacer from '../components/Spacer';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    }
  }

  onRefresh = () => {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000);
  }

  render() {
    const viewWidth = Dimensions.get('window').width;

    let container = {
      flex: 1,
    }

    let containerContent = {
      marginTop: 30,
    }

    let headerImage = {
      width: '80%',
      height: undefined,
      aspectRatio: 686 / 234,
      alignSelf: 'center'
    }

    let card = {
      margin: 10,
    }

    const centerText = {
      textAlign: 'center'
    }

    const explorButton = {
      justifyContent: 'flex-end',
      marginTop: 10,
    }

    const articleCover = {
      aspectRatio: 764 / 198,
      height: undefined,
      width: '100%',
    }

    return (
      <ScrollView
        contentContainerStyle={containerContent}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        style={container}>
        <Image
          resizeMode='contain'
          source={GoodAfternoon}
          style={headerImage} />
        <Card
          elevation={2}
          style={card}>
          <Card.Content>
            <Title style={centerText}>Vooey asked,</Title>
            <Paragraph style={centerText}>
              “How do you feel about your work life balance?”
            </Paragraph>
          </Card.Content>
          <Card.Actions style={explorButton}>
            <Button
              color={Colors.blue}
              compact={true}
              onPress={() => console.log('')}
              uppercase={false}>
              Explore your answer
            </Button>
          </Card.Actions>
        </Card>
        <TitleCard
          title="Recommended Articles">
          <Image
            resizeMode='contain'
            source={ArticleCard}
            style={articleCover} />
          <Card.Content>
            <Spacer vertical={10} />
            <Title>Tips for Reluctant Meditators </Title>
            <Paragraph>
              No time for mindfulness? Dan Harris can help. With over 20 years as a counselor he…
            </Paragraph>
          </Card.Content>
          <Card.Actions style={explorButton}>
            <Button
              color={Colors.blue}
              compact={true}
              onPress={() => console.log('')}
              uppercase={false}>
              Read
            </Button>
          </Card.Actions>
        </TitleCard>
        <Spacer vertical={100} />
      </ScrollView>
    );
  }
}
