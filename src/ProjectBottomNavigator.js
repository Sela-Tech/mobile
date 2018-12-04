import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from 'react-navigation';
import Inbox from './screens/Project';
import Profile from './screens/Project';
import Project from './screens/Project';
import Explore from './screens/ExploreProject';
import { YELLOW, WHITE } from '../src/utils/constants';

export default createBottomTabNavigator(
    {
        Project,
        Explore,
        Profile,
        Inbox,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Project') {
                    return (
                        <Image resizeMode="contain" source={require('../assets/briefcase.png')}
                            style={{ tintColor: focused ? YELLOW : `gray` }} />
                    )
                }
                else if (routeName === 'Profile') {
                    return <Image resizeMode="contain" source={require('../assets/inbox.png')}
                        style={{ tintColor: focused ? YELLOW : null }} />
                }
                else if (routeName === 'Explore') {
                    return <Image resizeMode="contain" source={require('../assets/explore.png')}
                        style={{ tintColor: focused ? YELLOW : null }} />
                }

                return <Image resizeMode="contain" source={require('../assets/profile.png')}
                    style={{ tintColor: focused ? YELLOW : null }} />
            },
        }),
        tabBarOptions: {
            activeTintColor: YELLOW,
            inactiveTintColor: 'gray',
        },
        navigationOptions: {
            title: 'Project',
        },
    }
);