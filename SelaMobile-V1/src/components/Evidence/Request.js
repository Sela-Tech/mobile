import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Button from '../Button';
import Text from '../Text';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
});

const Request = () => (
  <View style={styles.container}>
    <View style={{ marginTop: '10%' }}>
      <Button
        style={{
          width: width / 3,
        }}
        textColor={WHITE}
        text="Add Request"
      />
    </View>

    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>You have not made any evidence request</Text>
    </View>
  </View>
);
export default Request;
