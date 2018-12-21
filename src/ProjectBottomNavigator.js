import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from 'react-navigation';
import Inbox from './screens/Inbox';
import Project from './screens/Project';
import Profile from './screens/Profile';
import Explore from './screens/ExploreProject';
import { YELLOW } from './utils/constants';

export default createBottomTabNavigator(
  {
    Project,
    Explore,
    Inbox,
    Profile,
  },
  {
    navigationOptions: {
      title: 'Project',
      tabBarVisible: false,
    },
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
    // navigationOptions: {
    //   title: 'Project',
    // },
  },
);
