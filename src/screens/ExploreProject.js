import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Header from '../components/ExploreTopTabs/Header';
import Description from './ExploreTabs/Description';
import StakeHolders from './ExploreTabs/StakeHolders';
import Transactions from './ExploreTabs/Transactions';
import Updates from './ExploreTabs/Updates';
import { WHITE } from '../utils/constants';



export const ExploreTabs = createMaterialTopTabNavigator(
  {
    Description,
    StakeHolders,
    Updates,
    Transactions,
  },
  {
    tabBarOptions: {
      tabBarVisible: false,
      activeTintColor: '#201D41',
      inactiveTintColor: '#B1BAD2',
      showIcon: false,
      labelStyle: {
        fontSize: 9,
        fontWeight: '600',
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Image
            style={{ height: 200 }}
            source={require('../../assets/class.png')}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Header
            projectLocationText="LAGOS, NIGERIA."
            projectStatusText="COMPLETED"
            projectNameText="MARKERS LTD"
            projectTitleText="Construction of Classroom Blocks"
            budgetAmount="$10,000.00"
            numberOfStakeholders="$5,000.00"
            raisedAmount="40"
            tags={['Resilient infrasture', 'Sustainable Cities']}
          />
        </View>
        <View
          style={{ flex: 6 }}
        >
          <ExploreTopTabs />
        </View>
      </View>
    );
  }
};

