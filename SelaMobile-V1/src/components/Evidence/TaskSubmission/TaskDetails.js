import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import InnerContent from './InnerContent';
import Text from '../../Text';

const styles = StyleSheet.create({
  subContainer: {
    marginVertical: 5,
    flexDirection: 'row',
  },
});

const TaskDetails = ({ toggleModal }) => (
  <View>
    <View style={styles.subContainer}>
      <Text> 1 </Text>
      <Text style={{ fontSize: 16, color: '#0A2C56' }}> MileStone 1</Text>
    </View>
    <View style={{ marginBottom: 5 }}>
      <InnerContent toggleModal={toggleModal} />
    </View>
    <View style={{ marginBottom: 5 }}>
      <InnerContent toggleModal={toggleModal} />
    </View>
  </View>
);

export default TaskDetails;
