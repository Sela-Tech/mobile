import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import B from '../BoldText';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {},
  subContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  location: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const UserInfo = () => (
  <View>
    <View style={styles.subContainer}>
      <View style={{ alignItems: 'center' }}>
        <B size={20} color="#201D41">
          49
{' '}
        </B>
        <Text> Repition score</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 5 }}>
        <B size={20} color="#201D41">
          49
{' '}
        </B>
        <Text> Repition score</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <B size={20} color="#201D41">
          49
{' '}
        </B>
        <Text> Repition score</Text>
      </View>
    </View>
    <View style={styles.location}>
      <View>
        <Image source={require('../../../assets/location.png')} />
      </View>
      <View style={{ paddingLeft: 5 }}>
        <Text style={{ color: '#3D4851' }}> New york, USA </Text>
      </View>
    </View>
  </View>
);

export default UserInfo;
