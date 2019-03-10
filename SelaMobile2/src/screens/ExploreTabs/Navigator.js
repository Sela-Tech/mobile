import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Description from './Description';
import StakeHolders from './StakeHolders';
import Transactions from './Transactions';
import Overview from './Overview';
import Evidence from './Evidence';
import Location from './Location';
import Tasks from './Tasks';
import Updates from './Updates';
import { isAndroid } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';

const { width } = Dimensions.get('window');

const tabBarOptions = {
  upperCaseLabel: false,
  tabBarVisible: false,
  scrollEnabled: true,
  // lazy: false,
  tabStyle: {
    width: width / 3,
  },
  activeTintColor: '#201D41',
  inactiveTintColor: '#B1BAD2',
  showIcon: false,
  labelStyle: {
    // fontSize: 12,
    fontWeight: '400',
    fontFamily: isAndroid ? 'ProximaNova' : null,
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
    borderBottomColor: '#E8E8E8',
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: WHITE,
  },
};

export default class Navigator extends Component {
  state = {
    isContractor: false,
  };

  render() {
    const { navigation } = this.props;
    const { isContractor } = this.state;
    const { project } = this.props;
    const UpdatesOrTask = !isContractor ? Updates : Tasks;
    const TransactionOrOvervIew = !isContractor ? Transactions : Overview;

    let Tabs;
    if (isContractor) {
      Tabs = createMaterialTopTabNavigator(
        {
          Description: {
            screen: () => <Description project={project} />,
          },
          StakeHolders: {
            screen: () => <StakeHolders project={project} />,
          },
          Evidence: {
            screen: () => <Evidence navigation={navigation} project={project} />,
          },
          Tasks: {
            screen: () => <UpdatesOrTask project={project} />,
          },
          Overview: {
            screen: () => <TransactionOrOvervIew project={project} />,
          },
          Location: {
            screen: () => <Location project={project} />,
          },
        },
        {
          tabBarOptions,
        },
      );
    } else {
      Tabs = createMaterialTopTabNavigator(
        {
          Overview: {
            screen: () => <Overview navigation={navigation} project={project} />,
          },
          StakeHolders: {
            screen: () => <StakeHolders navigation={navigation} project={project} />,
          },
          Evidence: {
            screen: () => <Evidence navigation={navigation} project={project} />,
          },
          Updates: {
            screen: () => <UpdatesOrTask navigation={navigation} project={project} />,
          },
          Transactions: {
            screen: () => <TransactionOrOvervIew navigation={navigation} project={project} />,
          },
          Location: {
            screen: () => <Location navigation={navigation} project={project} />,
          },
        },
        {
          tabBarOptions,
        },
      );
    }

    const ExploreTopTabs = createAppContainer(Tabs);
    return <ExploreTopTabs />;
  }
}
