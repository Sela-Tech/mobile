import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: 'red',
    fontSize: 20,
  },
});

const StandardText = ({ viewStyle, textStyle, text, onPress, style }) => (
  <View style={[styles.container, viewStyle]}>
    <Text onPress={onPress} style={[styles.text, style, textStyle]}>
      {text}
    </Text>
  </View>
);

StandardText.defaultProps = {
  text: '',
  onPress: null,
  style: {},
  viewStyle: {},
  textStyle: {},
  children: '',
};

StandardText.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  viewStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  textStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
export default StandardText;
