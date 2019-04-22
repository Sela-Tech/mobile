import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Text from '../Text';
import B from '../BoldText';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#F5F5F8',
    borderBottomWidth: 1,
    height: height / 7,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const SingleTrans = ({ price, date, title, expense, paidBy }) => (
  <View style={styles.container}>
    <View style={{ flex: 2 }}>
      <B color="#201D41">{title}</B>
      <Text style={{ color: '#201D41' }}>{paidBy} </Text>
    </View>

    <View style={{ marginLeft: 2 }}>
      <B color="#369C05">{price}</B>
      <Text>{date}</Text>
    </View>
  </View>
);

export default SingleTrans;
