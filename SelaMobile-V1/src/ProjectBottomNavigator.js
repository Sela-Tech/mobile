import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import Inbox from './screens/Inbox';
import Wallet from './screens/Wallet';
import Project from './screens/Project';
import Profile from './screens/ProfileSettings';
import { YELLOW } from './utils/constants';
import { isAndroid } from './utils/helpers';
import Explore from './screens/ProjectListing';

export default createBottomTabNavigator(
  {
    Project,
    Explore,
    // Inbox,
    Wallet,
    Account: Profile,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Project') {
          return (
            <Image
              style={{ tintColor: focused ? YELLOW : null, resizeMode: 'contain', flex: 1 }}
              // resizeMode="contain"
              source={require('../assets/folder.png')}
              style={{ tintColor: focused ? YELLOW : `gray` }}
            />
          );
        }
        // if (routeName === 'Inbox') {
        //   return (
        //     <Image
        //       // resizeMode="contain"
        //       source={require('../assets/inbox.png')}
        //       style={{ tintColor: focused ? YELLOW : null }}
        //     />
        //   );
        // }
        if (routeName === 'Explore') {
          return (
            <Image
              // resizeMode="contain"
              source={require('../assets/explore.png')}
              style={{ tintColor: focused ? YELLOW : null, resizeMode: 'contain', flex: 1 }}
            />
          );
        }
        if (routeName === 'Wallet') {
          return (
            <Image
              // resizeMode="contain"
              source={require('../assets/wallet.png')}
              style={{ tintColor: focused ? YELLOW : null, resizeMode: 'contain', flex: 1 }}
            />
          );
        }

        return (
          <Image
            // resizeMode="contain"
            source={require('../assets/profile.png')}
            style={{ tintColor: focused ? YELLOW : null, resizeMode: 'contain', flex: 1 }}
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
        fontFamily: isAndroid ? 'Acumin-RPro' : null,
      },
    },
  },
);
