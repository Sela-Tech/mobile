import { createStackNavigator, createAppContainer } from 'react-navigation';
import Loading from './components/Loading';
import Login from './screens/Login';
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

import InboxScreen from './screens/Inbox';

export const RootStackNavigator = createStackNavigator({
  Project: {
    screen: ProjectBottomNavigator,
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

export const RootNavigator = createAppContainer(RootStackNavigator);
