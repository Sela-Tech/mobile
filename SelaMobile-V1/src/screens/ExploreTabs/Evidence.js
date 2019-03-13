import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView } from 'react-native';
import { Tabs, Tab } from 'native-base';
import Request from '../../components/Evidence/Request';
import Submissions from '../../components/Evidence/Submissions';
import ExtStyles from '../../utils/styles';
import { WHITE } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginVertical: 12,
    // backgroundColor: 'red',
  },
});

const Evidence = ({}) => (
  <ScrollView style={styles.container} contentContainerStyle={ExtStyles.flexGrow}>
    <Tabs
      tabBarUnderlineStyle={{
        backgroundColor: '#201D41',
      }}
    >
      <Tab
        heading="Requests"
        textStyle={{ color: '#B1BAD2', fontSize: 14 }}
        activeTextStyle={{ color: '#fff', fontSize: 14 }}
        activeTabStyle={{
          backgroundColor: '#201D41',
        }}
        tabStyle={{ backgroundColor: '#FFFFFF' }}
      >
        <Request />
      </Tab>

      <Tab
        heading="Submissions"
        textStyle={{ color: '#B1BAD2', fontSize: 14 }}
        activeTextStyle={{ color: '#fff', fontSize: 14 }}
        activeTabStyle={{
          backgroundColor: '#201D41',
        }}
        tabStyle={{ backgroundColor: '#FFFFFF' }}
      >
        <Submissions />
      </Tab>
    </Tabs>
  </ScrollView>
);

export default Evidence;
