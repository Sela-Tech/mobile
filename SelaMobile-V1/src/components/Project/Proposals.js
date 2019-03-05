import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, Tab } from 'native-base';
import { YELLOW } from '../../utils/constants';



const Pending = ({ data }) => (
    <View
        style={{ flex: 1, backgroundColor: 'blue' }}
    />
);

const Approved = ({ data }) => (
    <View
        style={{ flex: 1, backgroundColor: 'green' }}

    />
);


const Rejected = ({ data }) => (
    <View
        style={{ flex: 1, backgroundColor: 'red' }}

    />
);


export default class Proposals extends Component {

    render() {
        return (
            <Tabs
                tabBarUnderlineStyle={{
                    backgroundColor: YELLOW,
                }}>
                <Tab
                    activeTabStyle={{ backgroundColor: '#FFFFFF' }}
                    tabStyle={{ backgroundColor: '#FFFFFF' }}
                    activeTextStyle={{ color: '#201D41', fontSize: 14 }}
                    heading="Pending">
                    <Pending
                    />
                </Tab>
                <Tab
                    activeTabStyle={{ backgroundColor: '#FFFFFF' }}
                    tabStyle={{ backgroundColor: '#FFFFFF' }}
                    activeTextStyle={{ color: '#201D41', fontSize: 14 }}
                    heading="Approved">
                    <Approved

                    />
                </Tab>

                <Tab
                    activeTabStyle={{ backgroundColor: '#FFFFFF' }}
                    tabStyle={{ backgroundColor: '#FFFFFF' }}
                    activeTextStyle={{ color: '#201D41', fontSize: 14 }}
                    heading="Rejected">
                    <Rejected
                    />
                </Tab>
            </Tabs>
        )
    }
};

