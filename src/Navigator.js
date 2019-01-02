import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/Login';
import Home from './screens/Home';
import IntroScreen from './screens/Intro';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import OnBoarding from './screens/OnBoarding';
import SubmitFeedback from './screens/SubmitFeedback';
import CreateProject from './screens/CreateProject';
import ExploreProject from './screens/ExploreProject';
import ViewProject from './screens/ViewProject';
import ProjectBottomNavigator from './ProjectBottomNavigator';
import SuccessScreen from './screens/SuccessScreen';
import Notifications from './screens/Notifications';
import InboxScreen from './screens/Inbox';
import AuthLoadingScreen from './screens/AuthLoading';
import FirstTimeUserLoadingScreen from './screens/FirstTimeUserLoading';






export const RootStackNavigator = createStackNavigator({
  Project: {
    screen: ProjectBottomNavigator,
    // navigationOptions: {
    //   header: null,
    // },
  },
  Notification: {
    screen: Notifications,
  },
  // ExploreProject: {
  //   screen: ExploreProject,
  // },
  // ViewProject: {
  //   screen: ViewProject,
  // },
  // CreateProject: {
  //   screen: CreateProject,
  // },
  // Success: {
  //   screen: SuccessScreen,
  // },
  // SubmitFeedback: {
  //   screen: SubmitFeedback,
  //   // navigationOptions: {
  //   //   header: null,
  //   // },
  // },
  // Intro: {
  //   screen: IntroScreen,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  // Home: {
  //   screen: Home,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  // Loading: {
  //   screen: Loading,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  // OnBoarding: {
  //   screen: OnBoarding,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  // ForgotPassword: {
  //   screen: ForgotPassword,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null,
    },
  },
});

const AuthStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  OnBoarding: {
    screen: OnBoarding,
    navigationOptions: {
      header: null,
    },
  },
});

// const OnBoardingStack = createStackNavigator({
//   OnBoarding: {
//     screen: OnBoarding,
//     navigationOptions: {
//       header: null,
//     },
//   },
// });

const IntroStack = createStackNavigator({
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export const HomeSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AppHome: RootStackNavigator,
    AuthHome: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export const MainSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: FirstTimeUserLoadingScreen,
    App: HomeSwitchNavigator,
    Auth: IntroStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export const RootNavigator = createAppContainer(MainSwitchNavigator);
