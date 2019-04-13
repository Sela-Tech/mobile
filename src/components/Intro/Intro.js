import React, { Fragment } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import { WHITE } from '../../utils/constants';
import ExtStyle from '../../utils/styles';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  longText: {
    color: '#696F74',
    fontSize: 17,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  shortText: {
    fontWeight: '400',
    fontSize: 25,
    color: '#222829',
  },
  imageStyle: {
    flex: 1,
    width,
  },
  textContainer: {
    flex: 3,
    marginBottom: 10,
  },
});

const Intro = ({ image, shortText, longText }) => {
  const display = longText.split('\n');
  return (
    <View style={styles.container}>
      <View style={ExtStyle.flex2}>
        <Image source={image} style={styles.imageStyle} />
      </View>
      <View style={styles.innerContainer}>
        <View style={ExtStyle.flex1}>
          <Text style={styles.shortText}>{shortText} </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.longText}>{display[0].trim('')}</Text>
          <Text style={styles.longText}>{display[1].trim('')}</Text>
          <Text style={styles.longText}>{display[2].trim('')}</Text>
          <Fragment>
            {display.length === 4 ? (
              <Text style={styles.longText}>{display[3].trim('')}</Text>
            ) : null}
          </Fragment>
        </View>
      </View>
    </View>
  );
};

Intro.propTypes = {
  shortText: PropTypes.string,
  longText: PropTypes.string,
  image: PropTypes.number,
};

export default Intro;
