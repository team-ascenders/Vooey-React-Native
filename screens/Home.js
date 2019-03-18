import React, { Component } from 'react';
import { Image, ScrollView, RefreshControl, View } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { Transition } from 'react-navigation-fluid-transitions';

import GoodAfternoon from '../assets/GoodAfternoon.png';
import WorkingParents from '../assets/working-parents.jpg';
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

  handleExplorePressed = () => {
    this.props.navigation.navigate('DrillDown');
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  }

  render() {
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

    const parentCover = {
      width: '100%',
      height: undefined,
      aspectRatio: 700 / 393
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
            <Transition shared="vooey-question">
              <View>
                <Title style={centerText}>Vooey asked,</Title>
                <Paragraph style={centerText}>
                  “How do you feel about your work life balance?”
                </Paragraph>
              </View>
            </Transition>
          </Card.Content>
          <Card.Actions style={explorButton}>
            <Button
              color={Colors.blue}
              compact={true}
              onPress={this.handleExplorePressed}
              uppercase={false}>
              Explore your answer
            </Button>
          </Card.Actions>
        </Card>
        <TitleCard
          title="Recommended Articles">
          <Transition shared="parentImage">
            <View>
              <Image
                fadeDuration={0}
                resizeMode='contain'
                source={WorkingParents}
                style={parentCover} />
            </View>
          </Transition>
          <Card.Content>
            <Spacer vertical={10} />
            <Transition shared="parentTitle">
              <Title style={{backgroundColor: Colors.clear}}>Mindful Tips for Working Parents</Title>
            </Transition>
            <Transition shared="parentParagraph">
              <Paragraph style={{backgroundColor: Colors.clear}}>
                Setting aside time for formal meditation is an important way to establish a routine and get comfortable with...
              </Paragraph>
            </Transition>
          </Card.Content>
          <Card.Actions style={explorButton}>
            <Button
              color={Colors.blue}
              compact={true}
              onPress={() => this.props.navigation.navigate('Parenting')}
              uppercase={false}>
              Read More
            </Button>
          </Card.Actions>
        </TitleCard>
        <Card
          elevation={2}
          style={card}>
          <Transition shared="meditationImage">
            <View>
              <Image
                fadeDuration={0}
                resizeMode='contain'
                source={ArticleCard}
                style={articleCover} />
            </View>
          </Transition>
          <Card.Content>
            <Spacer vertical={10} />
            <Transition shared="meditationTitle">
              <Title style={{backgroundColor: Colors.clear}}>Tips for Reluctant Meditators</Title>
            </Transition>
            <Transition shared="meditationParagraph">
              <Paragraph style={{backgroundColor: Colors.clear}}>
                No time for mindfulness? Dan Harris can help. With over 20 years as a counselor he…
              </Paragraph>
            </Transition>
          </Card.Content>
          <Card.Actions style={explorButton}>
            <Button
              color={Colors.blue}
              compact={true}
              onPress={() => this.props.navigation.navigate('Meditation')}
              uppercase={false}>
              Read More
            </Button>
          </Card.Actions>
        </Card>
        <Spacer vertical={100} />
      </ScrollView>
    );
  }
}
