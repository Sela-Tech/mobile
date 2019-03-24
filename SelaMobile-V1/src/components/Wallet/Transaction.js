import React from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Text from '../Text';
import ExtStyles from '../../utils/styles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: height / 8,
    borderBottomColor: '#F5F5F8',
    borderBottomWidth: 2,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  senderText: {
    color: '#0A2C56',
    fontSize: 14,
  },
  amountText: {
    color: '#369C05',
    fontSize: 14,
  },
  date: {
    color: '#A2AAC2',
    fontSize: 12,
  },
});

const Transaction = ({ data, imageSource, sender, amount, date }) => (
  console.log('fkkff', data),
  <View style={styles.container}>
    <View style={ExtStyles.flex1}>
      <Image
        style={{ width: width / 8, height: width / 8, borderRadius: width / 16 }}
        source={imageSource}
      />
    </View>
    <View style={ExtStyles.flex4}>
      <View>
        <Text style={styles.senderText}>
          Payment for {` `}
          {data.taskName} {` `} task
        </Text>
      </View>
      <View>
        <Text style={styles.amountText}>
          PST {` `}
          {amount}
        </Text>
      </View>
      <View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
    <View style={ExtStyles.center}>
      <TouchableOpacity onPress={() => alert('press')}>
        <Image source={require('../../../assets/down_arrow.png')} />
      </TouchableOpacity>
    </View>
  </View>
);
export default Transaction;
