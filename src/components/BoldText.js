import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

const B = ({ fn, size, children, color, weight, style }) => (
  <Text onPress={fn} style={[style, { fontWeight: weight || 'bold', fontSize: size, color }]}>
    {children}
  </Text>
);

B.defaultProps = {
  // color: '',
  style: {},
  children: '',
  fn: null,
};

B.propTypes = {
  // color: PropTypes.string,
  fn: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
};
export default B;
