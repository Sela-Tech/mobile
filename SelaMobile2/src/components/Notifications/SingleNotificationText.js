import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import B from '../BoldText';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    height: 90,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  flex1: {
    flex: 1
  },
  mt5: {
    marginTop: 5,
  },
  subContainer: {
    flex: 5,
    paddingLeft: 10,
  },
});

const SingleNotificationText = ({ text, imageSRC, time }) => (
  <View style={styles.container}>
    <View style={styles.flex1}>
      <Image source={imageSRC} style={styles.imgStyle} />
    </View>
    <View style={styles.subContainer}>
      <View>
        <B>{text}</B>
      </View>
      <View style={styles.mt5}>
        <Text> {time} </Text>
      </View>
    </View>
  </View>
);

export default SingleNotificationText;
