import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Text from '../components/Text';
import { WHITE } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Wallet extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header headerName="WALLET" />
        <View style={styles.centerContainer}>
          <Text> Work in progress </Text>
        </View>
      </View>
    );
  }
}
