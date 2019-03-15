import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import AppContainer from './navigation/AppContainer';

class App extends Component {
  componentDidMount() {
    changeNavigationBarColor('white', true);
  }
  
  render() {
    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: 'white'
      }
    };
    return (
      <PaperProvider theme={theme}>
        <AppContainer style={styles.container} />
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
