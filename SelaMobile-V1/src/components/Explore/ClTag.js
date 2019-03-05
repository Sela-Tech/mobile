import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Image } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 6,
    height: width / 8,
    marginLeft: 5,
  },
  imageStyle: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});

const Tag = ({ src, showTag }) => (
  <TouchableOpacity style={styles.container} onPress={() => showTag(src)}>
    <Image resizeMode="contain" style={styles.imageStyle} source={src} />
  </TouchableOpacity>
);

export default Tag;
