import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TaskDetails from './TaskSubmission/TaskDetails';
import Text from '../Text';
import TaskLevelDetails from './TaskLevelDetails';

const styles = StyleSheet.create({
  container: {},
  taskDetailsContainer: {},
});

export default class TaskLevelSubmission extends Component {
  state = {
    empty: true,
    modalVisibility: false,
  };

  toggleModal = () => this.setState(prevState => ({ modalVisibility: !prevState.modalVisibility }));

  render() {
    const { empty, modalVisibility } = this.state;
    if (!empty) {
      return (
        <View style={styles.viewContainer}>
          <Text> No submissions yet</Text>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <TaskDetails toggleModal={this.toggleModal} />
        <TaskLevelDetails visibility={modalVisibility} toggleModal={this.toggleModal} />
      </View>
    );
  }
}
