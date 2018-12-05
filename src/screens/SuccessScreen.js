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
    backgroundColor: '#369C05',
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
        <Image
          source={require('../../assets/plus.png')}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}>
        <Text style={styles.fSize}> Your proposed project has been </Text>
        <Text style={styles.fSize}>  received and is under review. You</Text>
        <Text style={styles.fSize}>  will be notified  once it has been </Text>
        <Text style={styles.fSize}>  approved for fund raising </Text>
      </View>
    </View>
    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Button
        text="Back Home"
        color={WHITE}
        style={{
          borderWidth: 1,
        }}
        fn={() => navigation.navigate('Project')}
      />
    </View>
  </View>
);
