import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { YELLOW } from '../utils/constants';

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Spinner = ({ size, color }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || 'large'} color={color || YELLOW} />
  </View>
);

Spinner.defaultProps = {
  size: 'large',
  color: YELLOW,
};

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;
