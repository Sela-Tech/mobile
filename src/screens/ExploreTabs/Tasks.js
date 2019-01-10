import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Tasks from '../../components/ExploreProject/Tasks';
import EvalSubmission from '../../components/ExploreProject/EvalSubmission';
import Button from '../../components/Button';
import { WHITE } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 15,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 1,
    marginTop: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width / 2,
  },
});

export default () => (
  <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
    <Tasks statusText="In Progress" />
    <Tasks statusText="Completed" />
    <View style={{ paddingTop: 10, alignItems: 'center' }}>
      <Button text="Submit Updates" />
    </View>
  </ScrollView>
);
