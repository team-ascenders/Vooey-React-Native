import Onboarding from '../screens/Onboarding';
import Main from '../screens/Main';
import { createStackNavigator, createAppContainer } from "react-navigation";
import DrillDown from '../screens/DrillDown';

const AppNavigator = createStackNavigator(
  {
    Onboarding: {
      screen: Onboarding,
    },
    Main: {
      screen: Main,
    },
    DrillDown: {
      screen: DrillDown,
    }
  },
  {
    // TODO: CHANGE THIS BACK
    initialRouteName: "Main",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;