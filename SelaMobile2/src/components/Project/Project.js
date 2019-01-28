import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import Images from './Images';
import { YELLOW } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  semiContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    flex: 1,
  },
  bottomContainer: {
    paddingTop: 10,
    flex: 3,
  },
  leftContainer: {
    flex: 2,
    paddingLeft: 5,
  },
  leftTextContainer: {
    fontSize: 14,
    color: '#201D41',
  },
  rightContainer: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  rightContainerWithPadding: {
    paddingLeft: '5%',
  },
  rightTextContainer: {
    textAlign: 'center',
    color: YELLOW,
    fontSize: 14,
  },
});

const Project = ({ leftText, rightText, projects }) => (
  <View style={styles.container}>
    <View style={styles.semiContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.leftTextContainer}>
          {' '}
          {leftText}
          {' '}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.rightContainerWithPadding}>
          <Text style={styles.rightTextContainer}>
            {' '}
            {rightText}
            {' '}
          </Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Image source={require('../../../assets/forward-yellow.png')} />
        </View>
      </View>
    </View>

    <View style={styles.bottomContainer}>
      <Images
        projects={projects}
      />
    </View>
  </View>
);

Project.defaultProps = {

};

Project.propTypes = {

};


export default Project;
