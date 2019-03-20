import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import OverViewDetails from '../../components/Explore/OverView';
import Description from './Description';
import Stakeholders from './StakeHolders';
import Transactions from './Transactions';
import Evidence from './Evidence';
import Overview from './Overview';

import Location from './Location';
import Request from '../../components/Evidence/Request';
import Proposal from './Proposal';
import Tasks from './Tasks';
import Updates from './Updates';
import { isAndroid } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';

const { width } = Dimensions.get('window');

const tabBarOptions = {
  upperCaseLabel: false,
  tabBarVisible: false,
  scrollEnabled: true,
  tabStyle: {
    width: width / 3,
  },
  activeTintColor: '#201D41',
  inactiveTintColor: '#B1BAD2',
  showIcon: false,
  labelStyle: {
    // fontSize: 12,
    fontWeight: '400',
    fontFamily: isAndroid ? 'Acumin-RPro' : null,
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

class Navigator extends Component {
  state = {
    isContractor2: false,
  };

  render() {
    const { navigation } = this.props;
    const { isContractor2 } = this.state;
    const { project, userId } = this.props;

    const { isFunder, isEvaluator, isContractor } =
      this.props && this.props.userInfo && this.props.userInfo.user;
    const userRoleObj = {
      isFunder,
      isEvaluator,
      isContractor,
    };

    let userRole;
    if (userRoleObj && userRoleObj.isFunder) {
      userRole = 'funder';
    } else if (userRoleObj && userRoleObj.isContractor) {
      userRole = 'contractor';
    } else {
      userRole = 'evaluator';
    }

    let Tabs;

    if (userRole === 'funder') {
      Tabs = createMaterialTopTabNavigator(
        {
          Overview: {
            screen: () => <OverViewDetails userRole={userRole} project={project} />,
          },
          Analytics: {
            screen: () => <Overview userRole={userRole} project={project} />,
          },
          Stakeholders: {
            screen: () => <Stakeholders userRole={userRole} project={project} />,
          },
          Proposals: {
            screen: () => <Proposal userRole={userRole} project={project} userId={userId} />,
          },
          Evidence: {
            screen: () => <Request userRole={userRole} project={project} />,
          },
          Updates: {
            screen: () => <Updates userRole={userRole} project={project} />,
          },
          Transactions: {
            screen: () => <Transactions userRole={userRole} project={project} />,
          },
          Location: {
            screen: () => <Location userRole={userRole} project={project} />,
          },
        },
        {
          tabBarOptions,
        },
      );
    } else if (userRole === 'evaluator') {
      const nWidth = { tabStyle: { width: width / 2 } };
      const tabSettings = { ...tabBarOptions, ...nWidth };

      Tabs = createMaterialTopTabNavigator(
        {
          Overview: {
            screen: () => <OverViewDetails userRole={userRole} project={project} />,
          },
          Tasks: {
            screen: () => <Updates userRole={userRole} project={project} />,
          },
          Evidence: {
            screen: () => <Request userRole={userRole} project={project} />,
          },
        },
        {
          tabBarOptions, // : tabSettings,
        },
      );
    } else {
      Tabs = createMaterialTopTabNavigator(
        {
          Overview: {
            screen: () => <OverViewDetails userRole={userRole} project={project} />,
          },
          Analytics: {
            screen: () => <Overview userRole={userRole} project={project} />,
          },
          Updates: {
            screen: () => <Updates userRole={userRole} project={project} />,
          },
          Proposals: {
            screen: () => <Proposal userRole={userRole} project={project} userId={userId} />,
          },
          // Stakeholders: {
          //   screen: () => (
          //     <Stakeholders userRole={userRole} navigation={navigation} project={project} />
          //   ),
          // },
          // Evidence: {
          //   screen: () => <Request userRole={userRole} project={project} />,
          // },

          Transactions: {
            screen: () => <Transactions userRole={userRole} project={project} />,
          },
          // Location: {
          //   screen: () => <Location userRole={userRole} project={project} />,
          // },
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

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

export default connect(mapStateToProps)(Navigator);
