import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import { YELLOW } from '../../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height / 5,
    width: width / 2.3,
    borderRadius: 5,
    justifyContent: 'center',
    marginTop: 15,
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: '#F2994A',
  },
  imageBack: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  text: {
    color: '#0A2C56',
  },
});

const Box = ({ empty, imageSource, fn }) => (
  <TouchableOpacity style={styles.container} onPress={fn}>
    {empty ? (
      <ImageBackground style={styles.imageBack} source={imageSource} />
    ) : (
      <View style={(styles.empty, { alignItems: 'center', borderColor: '#F2994A' })}>
        <View style={{ justifyContent: 'center' }}>
          <Image tintColor={YELLOW} source={require('../../../assets/plus.png')} />
        </View>
        <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>Click to </Text>
          <Text style={styles.text}>upload file </Text>
        </View>
      </View>
    )}
  </TouchableOpacity>
);

Box.defaultProps = {
  empty: null,
  siteName: '',
  imageSource: '',
  fn: null,
  expandFn: null,
  text: 'Add New Site',
};

Box.propTypes = {
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  text: PropTypes.string,
  imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  fn: PropTypes.func,
};

export default Box;
