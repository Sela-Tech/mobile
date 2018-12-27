import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';
import { YELLOW } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

const UserId = () => (
  <View style={styles.container}>
    <View style={styles.imgStyle}>
      <Image source={require('../../../assets/img/man.png')} style={styles.imgStyle} />
    </View>
    <View style={{ alignItems: 'center', paddingTop: 5 }}>
      <Text style={{ fontSize: 20, color: YELLOW }}> Ade Bassey </Text>
      <Text> Contractor </Text>
    </View>
  </View>
);

export default UserId;
