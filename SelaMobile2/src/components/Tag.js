import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d3f8ec',
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
  },
  text: {
    color: '#1ECD97',
    fontWeight: '400',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

const Tag = ({ text, viewColor, textColor, style }) => (
  <View style={[styles.container, style, { backgroundColor: viewColor }]}>
    <Text style={[styles.text, { color: textColor }]}>
      {' '}
      {text}
    </Text>
  </View>
);

Tag.defaultProps = {};

Tag.propTypes = {};
export default Tag;
