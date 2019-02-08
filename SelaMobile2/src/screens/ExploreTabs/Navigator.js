import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Description from './Description';
import StakeHolders from './StakeHolders';
import Transactions from './Transactions';
import Overview from './Overview';
import Tasks from './Tasks';
import Updates from './Updates';
import { isAndroid } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';

const { width } = Dimensions.get('window');

const tabBarOptions = {
  tabBarVisible: false,
  activeTintColor: '#201D41',
  inactiveTintColor: '#B1BAD2',
  showIcon: false,
  labelStyle: {
    fontSize: width < 400 ? 7 : 9,
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
          Tasks: {
            screen: () => <UpdatesOrTask project={project} />,
          },
          Overview: {
            screen: () => <TransactionOrOvervIew project={project} />,
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
            screen: () => <Overview project={project} />,
          },
          StakeHolders: {
            screen: () => <StakeHolders navigation={navigation} project={project} />,
          },
          Updates: {
            screen: () => <UpdatesOrTask project={project} />,
          },
          Transactions: {
            screen: () => <TransactionOrOvervIew project={project} />,
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

// export const ContractorTab = createMaterialTopTabNavigator(
//   {
//     Description: {
//       screen: () => <Description } />,
//   },
//   StakeHolders: {
//     screen: () => <StakeHolders project={project} />,
//   },
//   Tasks: {
//     screen: () => <UpdatesOrTask project={project} />,
//   },
//   Overview: {
//     screen: () => <TransactionOrOvervIew project={project} />,
//   },
// {
//   tabBarComponent: props => <Tabbar {...props} /> ,
//     tabBarOptions,
//   },
// );


// export const FunderTab = createMaterialTopTabNavigator(
//   {
//     Overview: {
//       screen: () => <Overview />,
//     },
//     StakeHolders: {
//       screen: () => <StakeHolders />,
//     },
//     Updates: {
//       screen: () => <UpdatesOrTask />,
//     },
//     Transactions: {
//       screen: () => <TransactionOrOvervIew />,
//     },
//   },
//   {
//     tabBarOptions,
//   },
// );

