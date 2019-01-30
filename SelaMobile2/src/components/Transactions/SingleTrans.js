import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import B from '../BoldText';

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#F5F5F8',
    borderBottomWidth: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const SingleTrans = ({ price, date }) => (
  <View style={styles.container}>
    <View style={{ flex: 2, marginContent: 'space-around' }}>
      <B color="#201D41">Transac tion Memo Listed here </B>
      <Text style={{ color: '#201D41' }}>Ese Family trust </Text>
      <Text style={{ color: '#696F74' }}>Evaluation team </Text>
    </View>

    <View>
      <B color="#369C05">{price}</B>
      <Text>{date}</Text>
    </View>
  </View>
);

export default SingleTrans;
