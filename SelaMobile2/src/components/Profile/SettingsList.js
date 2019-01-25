import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Text from '../Text';
import B from '../BoldText';

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});

const SettingsList = ({ upText, downText }) => (
  <TouchableOpacity style={styles.container}>
    <View>
      <B size={14} color={upText === 'Logout' ? '#BC1717' : '#222829'}>
        {' '}
        {upText}{' '}
      </B>
    </View>
    <View style={{ paddingTop: 5 }}>
      <Text> {downText}</Text>
    </View>
  </TouchableOpacity>
);

export default SettingsList;
