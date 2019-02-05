import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { isAndroid } from '../utils/helpers';

const STATUSBAR_HEIGHT = !isAndroid ? 20 : StatusBar.currentHeight;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

const StatusBarN = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default StatusBarN;
