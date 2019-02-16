import React from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  upButton: {
    marginTop: 20,
    marginLeft: 15,
  },
});

const Image = ({ fn, imageSource }) => (
  <ImageBackground style={styles.container} source={imageSource}>
    <View style={styles.upButton}>
      <BackButton fn={fn} />
    </View>
  </ImageBackground>
);

Image.defaultProps = {
  fn: null,
  // imageSource: '',
};
Image.propTypes = {
  fn: PropTypes.func,
  // imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Image;
