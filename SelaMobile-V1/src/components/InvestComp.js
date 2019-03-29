import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import Box from './Invest/Box';
import Extstyle from '../utils/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  top: {
    paddingTop: '10%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fSize: {
    fontSize: 15,
    color: '#222829',
  },
});

export default ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.top}>
      <View>
        <Image source={require('../../assets/money2.png')} />
      </View>
      <View style={{ paddingTop: '5%', alignItems: 'center' }}>
        <Text style={styles.fSize}>
          {' '}
          Invest in the
          {navigation.state.params.name}{' '}
        </Text>
        <Text style={styles.fSize}> Scheme project using either of the </Text>
        <Text style={styles.fSize}> methods below </Text>
      </View>
    </View>
    <View style={Extstyle.flex3}>
    </View>
  </View>
);
