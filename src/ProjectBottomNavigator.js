import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Inbox from './screens/Inbox';
import Project from './screens/Project';
import ProfileScreen from './screens/Profile';
import ExploreProjectScreen from './screens/ExploreProject';
import ProfileSettingsScreen from './screens/ProfileSettings';
import { YELLOW } from './utils/constants';
import ProjectListingScreen from './screens/ProjectListing';

const ProjectStack = createStackNavigator({
  // ProjectListing: {
  //   screen: ProjectListingScreen,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
  ExploreProject: {
    screen: ExploreProjectScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  ProfileSettings: {
    screen: ProfileSettingsScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export default createBottomTabNavigator(
  {
    Project,
    Explore: ProjectStack,
    Inbox,
    Profile: ProfileStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Project') {
          return (
            <Image
              resizeMode="contain"
              source={require('../assets/briefcase.png')}
              style={{ tintColor: focused ? YELLOW : `gray` }}
            />
          );
        }
        if (routeName === 'Inbox') {
          return (
            <Image
              resizeMode="contain"
              source={require('../assets/inbox.png')}
              style={{ tintColor: focused ? YELLOW : null }}
            />
          );
        }
        if (routeName === 'Explore') {
          return (
            <Image
              resizeMode="contain"
              source={require('../assets/explore.png')}
              style={{ tintColor: focused ? YELLOW : null }}
            />
          );
        }

        return (
          <Image
            resizeMode="contain"
            source={require('../assets/profile.png')}
            style={{ tintColor: focused ? YELLOW : null }}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: YELLOW,
      inactiveTintColor: 'gray',
    },
  },
);
