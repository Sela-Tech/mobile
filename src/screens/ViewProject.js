import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { WHITE, YELLOW } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default class extends Component {
  render() {
    return (
      <View>
        <Text />
      </View>
    );
  }
}
