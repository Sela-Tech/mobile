import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Description from './ExploreTabs/Description';
import StakeHolders from './ExploreTabs/StakeHolders';
import Transactions from './ExploreTabs/Transactions';
import Updates from './ExploreTabs/Updates';

import Input from '../components/Input';
import Button from '../components/Button';
import Text from '../components/Text';
import { WHITE, YELLOW } from '../utils/constants';
import { isAndroid } from '../utils/helpers';
import Box from '../components/ExploreProject/Box';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    // backgroundColor: WHITE,
    // alignItems: 'center',
    // paddingBottom: 20,
  },
});

export const ExploreTabs = createMaterialTopTabNavigator(
  {
    Description,
    StakeHolders,
    Transactions,
    Updates,
  },
  {
    tabBarOptions: {
      activeTintColor: '#201D41',
      inactiveTintColor: '#B1BAD2',
      showIcon: false,
      labelStyle: {
        fontSize: 9,
      },
      style: {
        backgroundColor: '#fff',
        shadowColor: '#fff',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        height: 47,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8'
      },
      indicatorStyle: {
        height: 2,
        backgroundColor: WHITE,
      },
    },
  },
);

export const ExploreTopTabs = createAppContainer(ExploreTabs);

export default class ExploreProject extends Component {
  static navigationOptions = {
    title: 'EXPLORE',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
    },
    headerStyle: {
      fontFamily: 'proximaNova',
      fontWeight: 'normal',
    },
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Image
            source={require('../../assets/class.png')}
          />
        </View>
        <View
          style={{ flex: 1, backgroundColor: 'red' }}
        >
          <ExploreTopTabs />
        </View>
      </View>
    );
  }
};

