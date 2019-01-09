import React, { Component } from 'react';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Description from './Description';
import StakeHolders from './StakeHolders';
import Transactions from './Transactions';
import Overview from './Overview';
import Tasks from './Tasks';
import Updates from './Updates';
import { WHITE } from '../../utils/constants';


const tabBarOptions = {
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
        borderBottomColor: '#E8E8E8',
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: WHITE,
    },
};

export default class Navigator extends Component {
    state = {
        isContractor: true
    }

    render() {

        const { isContractor } = this.state;
        const updatesOrTask = isContractor === true ? Updates : Tasks;
        const transactionOrOvervIew = isContractor === true ? Transactions : Overview;

        const Tabs = createMaterialTopTabNavigator(
            {
                Description,
                StakeHolders,
                isContractor? 'Tasks' : 'Updates',
                isContractor? 'Transactions' : 'OverView',
            },
            {
                tabBarOptions
            },
        );
        const ExploreTopTabs = createAppContainer(Tabs);
        return (<ExploreTopTabs />)
    }
}
