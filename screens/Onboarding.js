import React, { Component } from 'react';
import { Image, Linking, ScrollView, StatusBar, Text, View } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import Dimensions from 'Dimensions';

import Dots from '../components/Dots';
import Colors from '../assets/Colors';
import CircleDesign from '../assets/CircleDesign.png';
import GoogleMic from '../assets/Google_mic.svg.png';
import GoogleAsst from '../assets/Google_Assistant_logo.png';
import Privacy from '../assets/1_p194CR1zg1umsgDlbQlmSw.png';

export default class Onboarding extends Component {
  static navigationOptions = {
    header: null
  }
  
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  handleScroll = (event) => {
    const viewWidth = Dimensions.get('window').width;
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / viewWidth);

    this.setState({ index });
  }

  skipButtonPressed = () => {
    const isLast = this.state.index == 2;
    const viewWidth = Dimensions.get('window').width;
    const nextIndex = this.state.index + 1;

    if (isLast) {
      this.props.navigation.navigate('Main')
    } else {
      this.refs.scrollView.scrollTo({ x: viewWidth * nextIndex, y: 0, animated: true });
      this.setState({ index: nextIndex });
    }
  }

  render() {
    const cardPadding = 15;
    const cardElevation = 5;
    const viewWidth = Dimensions.get('window').width;
    const cardWidth = viewWidth - 2 * cardPadding;
    const isLast = this.state.index == 2;

    const card = {
      width: cardWidth,
      margin: cardPadding,
    }

    const centerText = {
      textAlign: 'center'
    }

    const link = {
      textAlign: 'center',
      color: Colors.blue,
      padding: 20
    }

    const container = {
      flex: 1,
      justifyContent: 'center'
    }

    const scrollContainer = {
      flexGrow: 1,
      alignItems: 'center'
    }

    const scrollView = {
      marginBottom: 15,
    }

    const skipButtonContainer = {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 25,
      left: 0,
      right: 0,
    }

    const backgroundImage = {
      position: 'absolute',
      left: 0,
      top: 0,
      width: viewWidth,
      height: (356 / 824) * viewWidth,
    }

    const coverPhoto = {
      height: 80,
      alignSelf: 'center',
      margin: 30,
    }

    const button = {
      width: '50%'
    }

    return (
      <View
        style={container}>
        <StatusBar backgroundColor={Colors.transparent} barStyle="light-content" translucent />
        <Image
          resizeMode='contain'
          source={CircleDesign}
          style={backgroundImage} />
        <View>
          <ScrollView
            contentContainerStyle={scrollContainer}
            style={scrollView}
            horizontal
            onScroll={this.handleScroll}
            pagingEnabled
            ref="scrollView"
            showsHorizontalScrollIndicator={false}>
            <Card
              elevation={cardElevation}
              style={card}>
              <Image
                resizeMode='contain'
                source={GoogleMic}
                style={coverPhoto} />
              <Card.Content>
                <Title style={centerText}>Hi, there!</Title>
                <Paragraph style={centerText}>
                  I’m Vooey, I’m here to listen to whatever you want to talk about. As I get to know you better, I’ll create personalized recommendations for your well-being.
                </Paragraph>
              </Card.Content>
            </Card>
            <Card
              elevation={cardElevation}
              style={card}>
              <Image
                resizeMode='contain'
                source={GoogleAsst}
                style={coverPhoto} />
              <Card.Content>
                <Title style={centerText}>Connect</Title>
                <Paragraph style={centerText}>
                  I can sync with your devices and be there for you anytime, anyplace. You can talk to me in your car during your commute, or chat anytime using the app.
                </Paragraph>
              </Card.Content>
            </Card>
            <Card
              elevation={cardElevation}
              style={card}>
              <Image
                resizeMode='contain'
                source={Privacy}
                style={coverPhoto} />
              <Card.Content>
                <Title style={centerText}>Privacy</Title>
                <Paragraph style={centerText}>
                  We do not share any personal information. You can read our privacy statement here.
                </Paragraph>
                <Text
                  style={link}
                  onPress={() => Linking.openURL('https://safety.google')}>
                  Google Privacy Statement
                </Text>
              </Card.Content>
            </Card>
          </ScrollView>
          <Dots
            length={3}
            selected={this.state.index} />
        </View>
        <View style={skipButtonContainer}>
          <Button
            color={Colors.green}
            mode={isLast ? 'contained' : 'outlined'}
            onPress={this.skipButtonPressed}
            style={button}>
            {isLast ? 'Start' : 'Skip'}
          </Button>
        </View>
      </View>
    );
  }
}
