import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import ExtStyles from '../../utils/styles';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 15,
    backgroundColor: 'red',
  },
});

const Evidence = ({}) => (
  <ScrollView style={styles.container} contentContainerStyle={ExtStyles.flexGrow} />
);

export default Evidence;
