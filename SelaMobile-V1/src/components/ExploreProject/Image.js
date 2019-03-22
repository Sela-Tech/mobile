import React, { Fragment } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';
import Button from '../Button';
import { YELLOW } from '../../utils/constants';

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

const Image = ({ fn, imageSource, btn, btnFn }) => (
  <ImageBackground style={styles.container} source={imageSource}>
    <View style={styles.upButton}>
      <BackButton fn={fn} />
    </View>
    <Fragment>
      {btn ? (
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
          }}
        >
          <Button
            text="submit"
            fn={btnFn}
            style={{
              backgroundColor: YELLOW,
              width: 100,
            }}
          />
        </View>
      ) : null}
    </Fragment>
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
