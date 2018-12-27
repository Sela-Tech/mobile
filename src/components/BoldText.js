import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

const B = ({ fn, size, children, color, style }) => (
  <Text onPress={fn} style={[style, { fontWeight: 'bold', fontSize: size, color }]}>
    {children}
  </Text>
);

B.defaultProps = {
  onPress: null,
  style: {},
  children: '',
};

B.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
export default B;
