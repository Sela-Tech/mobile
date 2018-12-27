import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 100,
    marginLeft: 10,
    backgroundColor: '#d3f8ec',
    justifyContent: 'center',
    borderRadius: 4,
    alignItems: 'center',
  },
  text: {
    color: '#1ECD97',
    fontWeight: '400',
  },
});

const Tag = ({ text, viewColor, textColor }) => (
  <View style={[styles.container, { backgroundColor: viewColor }]}>
    <Text style={[styles.text, { color: textColor }]}> 
{' '}
{text}
</Text>
  </View>
);

Tag.defaultProps = {};

Tag.propTypes = {};
export default Tag;
