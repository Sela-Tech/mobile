import React, { Fragment } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import NavigationService from '../services/NavigationService';
import ExtStyle from '../utils/styles';

const { width } = Dimensions.get('window');

const styles = {
  container: {
    flexDirection: 'row',
    width,

    alignItems: 'center',
    justifyContent: 'center',
  },
};
const IntroHeader = ({ back, keyboard, fn }) => (
  <View style={[styles.container]}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {back ? (
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1, alignItems: 'center', marginLeft: 10 }}>
            <TouchableOpacity onPress={fn}>
              <Image
                resizeMode="contain"
                style={{}}
                source={require('../../assets/img/back.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 2, backgroundColor: 'white' }} />
        </View>
      ) : null}
    </View>
    <View style={[!back ? { flex: 3, alignItems: 'center' } : null]}>
      <Image style={{ width: 50, height: 50 }} source={require('../../assets/img/logo.png')} />
    </View>
    <View style={ExtStyle.flex1} />
  </View>
);

IntroHeader.defaultProps = {};

export default IntroHeader;
