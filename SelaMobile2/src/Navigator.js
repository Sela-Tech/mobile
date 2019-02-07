import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from './screens/Login';
import IntroScreen from './screens/Intro';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import OnBoarding from './screens/OnBoarding';
import SubmitFeedback from './screens/SubmitFeedback';
import CreateProject from './screens/CreateProject';
import ViewProject from './screens/ViewProject';
import ProjectBottomNavigator from './ProjectBottomNavigator';
import SuccessScreen from './screens/SuccessScreen';
import Notifications from './screens/Notifications';
import AuthLoadingScreen from './screens/AuthLoading';
import FirstTimeUserLoadingScreen from './screens/FirstTimeUserLoading';
import SignUpSuccessScreen from './screens/SignUpSuccess';
import InvestComp from './components/InvestComp';
import ExploreProjectScreen from './screens/ExploreProject';
import ProfileScreen from './screens/Profile';

import { isAndroid } from './utils/helpers';

export const RootStackNavigator = createStackNavigator(
  {
    Project: {
      screen: ProjectBottomNavigator,
      navigationOptions: {
        header: null,
      },
    },
    Notification: {
      screen: Notifications,
    },
    ViewProject: {
      screen: ViewProject,
    },
    ExploreProject: {
      screen: ExploreProjectScreen,
      navigationOptions: {
        header: null,
      },
    },
    UserProfile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
      },
    },
    CreateProject: {
      screen: CreateProject,
    },
    Success: {
      screen: SuccessScreen,
      navigationOptions: {
        header: null,
      },
    },
    SubmitFeedback: {
      screen: SubmitFeedback,
      // navigationOptions: {
      //   header: null,
      // },
    },
    Invest: {
      screen: InvestComp,
    },
  },
  {
    defaultNavigationOptions: {
      labelStyle: {
        // fontSize: width < 400 ? 7 : 9,
        // fontWeight: '400',
        fontFamily: isAndroid ? 'ProximaNova' : null,
      },
    },
  },
);

const AuthStack = createStackNavigator(
  {
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
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: null,
      },
    },
    ResetPassword: {
      screen: ResetPassword,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        fontFamily: isAndroid ? 'ProximaNova' : null,
      },
    },
  },
);

const IntroStack = createStackNavigator({
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignUpSuccess: {
    screen: SignUpSuccessScreen,
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

export const TestStackNavigator = createStackNavigator({
  SubmitFeedback: {
    screen: SubmitFeedback,
    // navigationOptions: {
    //   header: null,
    // },
  },
  CreateProject: {
    screen: CreateProject,
  },
  // Login: {
  //   screen: LoginScreen,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  // Intro: {
  //   screen: IntroScreen,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  OnBoarding: {
    screen: OnBoarding,
    navigationOptions: {
      header: null,
    },
  },
  SignUpSuccess: {
    screen: SignUpSuccessScreen,
    navigationOptions: {
      header: null,
    },
  },
});

// export const RootNavigator = createAppContainer(TestStackNavigator);

export const RootNavigator = createAppContainer(MainSwitchNavigator);

// export const RootNavigator = createAppContainer(RootStackNavigator);
