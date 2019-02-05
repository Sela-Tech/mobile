import React from 'react';
import { Dimensions, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width / 1.5,
    height: height / 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 15,
  },
});

const Box = ({ downText, imgSource }) => (
  <TouchableOpacity style={styles.container}>
    <View>
      <Image source={imgSource} />
    </View>
  </TouchableOpacity>
);
Box.defaultProps = {};

Box.propTypes = {};
export default Box;
