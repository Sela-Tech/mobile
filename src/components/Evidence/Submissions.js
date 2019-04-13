import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Tabs, Tab } from 'native-base';
import TaskLevelSubmission from './TaskLevelSubmission';
import ProjectLevelSubmission from './ProjectLevelSubmission';
import ExtStyles from '../../utils/styles';
import { WHITE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Submissions = () => (
  <ScrollView style={styles.container} contentContainerStyle={ExtStyles.flexGrow}>
    <Tabs
      tabBarUnderlineStyle={{
        backgroundColor: '#201D41',
      }}
    >
      <Tab
        heading="Project level"
        textStyle={{ color: '#B1BAD2', fontSize: 14 }}
        activeTextStyle={{ color: '#B1BAD2', fontSize: 14 }}
        activeTabStyle={{
          backgroundColor: WHITE,
        }}
        tabStyle={{ backgroundColor: '#F5F5F8' }}
      >
        <ProjectLevelSubmission />
      </Tab>

      <Tab
        heading="Task level"
        textStyle={{ color: '#B1BAD2', fontSize: 14 }}
        activeTextStyle={{ color: '#B1BAD2', fontSize: 14 }}
        activeTabStyle={{
          backgroundColor: WHITE,
        }}
        tabStyle={{ backgroundColor: '#F5F5F8' }}
      >
        <TaskLevelSubmission />
      </Tab>
    </Tabs>
  </ScrollView>
);
export default Submissions;
