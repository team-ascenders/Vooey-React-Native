import Onboarding from '../screens/Onboarding';
import Main from '../screens/Main';
import { createStackNavigator, createAppContainer } from "react-navigation";
import DrillDown from '../screens/DrillDown';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import Transcript from '../screens/Transcript';
import ParentingArticle from '../screens/ParentingArticle';
import MeditationArticle from '../screens/MeditationArticle';

const DrillDownScene = createStackNavigator(
  {
    DrillDown: {
      screen: DrillDown,
    },
    Transcript: {
      screen: Transcript
    }
  },
  {
    initialRouteName: "DrillDown",
    headerMode: 'none'
  }
)
const AppNavigator = FluidNavigator(
  {
    Onboarding: {
      screen: Onboarding,
    },
    Main: {
      screen: Main,
    },
    DrillDown: DrillDownScene,
    Parenting: {
      screen: ParentingArticle
    },
    Meditation: {
      screen: MeditationArticle
    },
    Transcript: {
      screen: Transcript
    }
  },
  {
    // TODO: CHANGE THIS BACK
    initialRouteName: "Main",
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;