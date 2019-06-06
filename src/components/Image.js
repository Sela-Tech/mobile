import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const Image = ({ style, uri }) => (
  <FastImage
    style={style}
    source={{
      uri: uri || 'https://unsplash.it/400/400?image=1',
      priority: FastImage.priority.normal,
    }}
    resizeMode={FastImage.resizeMode.contain}
  />
);

Image.defaultProps = {
  uri: null,
  style: {},
};

Image.propTypes = {
  uri: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Image;
