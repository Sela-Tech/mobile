import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Text from '../components/Text';
import Button from '../components/Button';
import { WHITE } from '../utils/constants';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  success: {
    height: height / 10,
    width: height / 10,
    borderRadius: height / 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fSize: {
    fontSize: 18,
  },
});

export default ({ navigation }) => (
  <View style={styles.container}>
    <View style={{ flex: 4, alignItems: 'center', marginTop: '25%' }}>
      <View style={styles.success}>
        <Image source={require('../../assets/mark.png')} />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
        <Text style={styles.fSize}> Sign up successfull.Kindly Visit email to </Text>
        <Text style={styles.fSize}> activate account</Text>
      </View>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Button
        text="Login"
        color={WHITE}
        style={{
          borderWidth: 1,
        }}
        fn={() => navigation.navigate('Login')}
      />
    </View>
  </View>
);
