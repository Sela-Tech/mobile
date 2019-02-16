import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native';
import Text from '../Text';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: height / 5,
    width: width / 2.2,
  },
});

const Project = ({ imgSource, test, style }) => (
  <ImageBackground
    style={[styles.container, style]}
    source={imgSource}
    imageStyle={{ borderRadius: 10 }}
  >
    <View style={{ paddingTop: 20, paddingLeft: 10 }}>
      <Text style={{ color: WHITE }}> {test} </Text>
    </View>
  </ImageBackground>
);

export default Project;
