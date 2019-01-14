import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Task from '../../components/ExploreProject/Tasks';
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

export default class Tasks extends Component {

  render() {
    const project = this.props;
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <Task statusText="In Progress" />
        <Task statusText="Completed" />
        <View style={{ paddingTop: 10, alignItems: 'center' }}>
          <Button text="Submit Updates" />
        </View>
      </ScrollView>
    )
  }
}

