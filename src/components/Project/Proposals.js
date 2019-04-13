import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Tabs, Tab } from 'native-base';
import ProposalContent from './ProposalContent';
import { YELLOW } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Pending = ({ data }) => (
  <View style={styles.container}>
    <ProposalContent />
  </View>
);

const Approved = ({ data }) => (
  <View style={styles.container}>
    <ProposalContent />
  </View>
);
const Rejected = ({ data }) => (
  <View style={styles.container}>
    <ProposalContent />
  </View>
);

export default class Proposals extends Component {
  render() {
    return (
      <Tabs
        tabBarUnderlineStyle={{
          backgroundColor: YELLOW,
        }}
      >
        <Tab
          activeTabStyle={{ backgroundColor: '#FFFFFF' }}
          tabStyle={{ backgroundColor: '#FFFFFF' }}
          activeTextStyle={{ color: '#201D41', fontSize: 14 }}
          heading="Pending"
        >
          <Pending />
        </Tab>
        <Tab
          activeTabStyle={{ backgroundColor: '#FFFFFF' }}
          tabStyle={{ backgroundColor: '#FFFFFF' }}
          activeTextStyle={{ color: '#201D41', fontSize: 14 }}
          heading="Approved"
        >
          <Approved />
        </Tab>

        <Tab
          activeTabStyle={{ backgroundColor: '#FFFFFF' }}
          tabStyle={{ backgroundColor: '#FFFFFF' }}
          activeTextStyle={{ color: '#201D41', fontSize: 14 }}
          heading="Rejected"
        >
          <Rejected />
        </Tab>
      </Tabs>
    );
  }
}
