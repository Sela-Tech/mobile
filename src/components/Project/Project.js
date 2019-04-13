import React, { Fragment } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import Box from './Box';
import B from '../BoldText';
import Images from './Images';
import { emptyProjectText } from '../../utils/helpers';
import { YELLOW } from '../../utils/constants';

const { height } = Dimensions.get('window');
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
  emptyBox: {
    height: height / 8,
    paddingTop: '5%',
    alignItems: 'center',
  },
  textInEmptyBox: {
    fontSize: 15,
    fontWeight: '300',
  },
});

const Project = ({ column, leftText, rightText, projects }) => (
  <View style={styles.container}>
    <View style={styles.semiContainer}>
      <View style={styles.leftContainer}>
        <B
weight="400" style={styles.leftTextContainer}>
          {leftText}
{' '}
        </B>
      </View>
      <Fragment>
        {projects && projects.length > 0 ? (
          <View style={styles.rightContainer}>
            <View style={styles.rightContainerWithPadding}>
              <Text style={styles.rightTextContainer}> 
{' '}
{rightText}
{' '}
 </Text>
            </View>
          </View>
        ) : null}
      </Fragment>
    </View>

    <View style={styles.bottomContainer}>
      <Fragment>
        <Images column leftText={leftText} projects={projects} />
      </Fragment>
    </View>
  </View>
);

Project.defaultProps = {};

Project.propTypes = {};

export default Project;
