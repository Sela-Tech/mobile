import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Inbox from './screens/Inbox';
import Project from './screens/Project';
import Profile from './screens/ProfileSettings';
import { YELLOW } from './utils/constants';
import { isAndroid } from './utils/helpers';
import Explore from './screens/ProjectListing';

export default createBottomTabNavigator(
  {
    Project,
    Explore,
    Inbox,
    Profile,
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
      labelStyle: {
        // fontSize: width < 400 ? 7 : 9,
        // fontWeight: '400',
        fontFamily: isAndroid ? 'ProximaNova' : null,
      },
    },
  },
);
