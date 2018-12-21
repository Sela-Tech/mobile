import React from 'react';
import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native';
import { CheckBox } from 'native-base';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: height / 7,
    width: width / 4,
  },
  checkedStatus: {
    position: 'absolute',
    right: 1,
    top: -2,
  },
});

const EvalSubmission = ({ imgSource, markedStatus }) => (
  <ImageBackground style={styles.container} source={imgSource} imageStyle={{ borderRadius: 10 }}>
    <View style={styles.checkedStatus}>
      <CheckBox size={10} color="#6FCF97" checked={markedStatus} />
    </View>
  </ImageBackground>
);

export default EvalSubmission;
