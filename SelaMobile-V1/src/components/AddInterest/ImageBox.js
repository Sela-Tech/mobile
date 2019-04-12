import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 3.5,
    height: height / 5,
  },
  image: {
    flex: 1,
    width: undefined,
    height: height / 5,
  },
});

const ImageBox = ({ imageSrc }) => (
  <TouchableOpacity style={styles.container} source={imageSrc}>
    <Image style={styles.image} source={imageSrc} resizeMode="contain" />
  </TouchableOpacity>
);

export default ImageBox;
