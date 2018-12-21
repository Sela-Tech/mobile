import React from 'react';
import Text from './Text';
import PropTypes from 'prop-types';

const B = ({ fn, size, children, color }) => (
  <Text onPress={fn} style={{ fontWeight: 'bold', fontSize: size, color }}>
    {children}
  </Text>
);
export default B;
