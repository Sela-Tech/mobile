import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../Button';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const Submissions = () => (
  <View style={styles.container}>
    <Button text="Add Submissions" />
    <View>
      <Text>You have not made any evidence Submissions</Text>
    </View>
  </View>
);
export default Submissions;
