import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import NavigationService from '../services/NavigationService';
import Text from './Text';
import B from './BoldText';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F5F5F8',
    width: width / 1.3,
    marginVertical: 12,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageStyle: {
    height: width / 6,
    width: width / 6,
    borderRadius: width / 12,
  },
  starImageStyle: {
    flexDirection: 'row',
    marginTop: 5,
  },
  companyNameViewStyle: {
    marginTop: 5,
  },
  companyNameStyle: {
    fontWeight: '400',
  },
  userNameStyle: {
    height: 80,
    marginLeft: 20,
    justifyContent: 'center',
  },
  pl10: {
    paddingLeft: 10,
  },
});

const UserProfile = ({ imgSource, userName, companyName, userId }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => NavigationService.navigate('UserProfile', userId)}
  >
    <View style={styles.subContainer}>
      <View style={styles.pl10}>
        <Image
          style={styles.imageStyle}
          // resizeMode="contain"
          source={imgSource}
        />
      </View>
      <View style={styles.userNameStyle}>
        <View>
          <B>
{userName}
{' '}
 </B>
        </View>
        <View style={styles.starImageStyle}>
          <Image source={require('../../assets/star.png')} />
          <Text> 80 </Text>
        </View>
        <View style={styles.companyNameViewStyle}>
          <B style={styles.companyNameStyle}>{companyName}</B>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

UserProfile.defaultProps = {};

UserProfile.propTypes = {};

export default UserProfile;
