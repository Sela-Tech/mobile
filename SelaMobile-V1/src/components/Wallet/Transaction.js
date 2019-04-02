import React from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Text from '../Text';
import B from '../BoldText';
import ExtStyles from '../../utils/styles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: height / 6.5,
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
    // color: ,
    fontSize: 14,
  },
  date: {
    color: '#A2AAC2',
    fontSize: 12,
  },
});

const Transaction = ({ data, imageSource, sender, amount, date, taskName }) =>( 
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
    {taskName}
        </Text>
      </View>
      <View>
        <Text style={[styles.amountText, { color: data.operation === 'received' ? '#369C05' : '#BC1717'}]}>
          PST {` `}
          {amount}
        </Text>
      </View>
      <View>
        <Text style={styles.date}>{moment(date).format('MMMM Do YYYY')}</Text>
      </View>
    </View>
    <View style={ExtStyles.center}>
      {/* <TouchableOpacity onPress={() => console.log('press')}>
        <Image source={require('../../../assets/down_arrow.png')} />
      </TouchableOpacity> */}
    </View>
  </View>
);
export default Transaction;
