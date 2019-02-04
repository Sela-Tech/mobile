import React, { Fragment } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import Box from './Box';
import Images from './Images';
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
    height: height / 5,
    paddingTop: '5%',
    alignItems: 'center',
  },
  textInEmptyBox: {
    fontSize: 15,
    fontWeight: '300',
  },
});

const Project = ({ leftText, rightText, projects }) => (
  <View style={styles.container}>
    <View style={styles.semiContainer}>
      <View style={styles.leftContainer}>
        <Text style={styles.leftTextContainer}>
          {leftText}
          {' '}
        </Text>
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
            {/* <View style={{ justifyContent: 'center' }}>
              <Image source={require('../../../assets/forward-yellow.png')} />
            </View> */}
          </View>
        ) : null}
      </Fragment>
    </View>

    <View style={styles.bottomContainer}>
      <Fragment>
        {
          leftText === 'Projects you proposed' ? (
            <Images
              leftText={leftText}
              projects={projects}
            />
          ) :
            (
              projects && projects.length === 0 ? (
                <Fragment>
                  {
                    leftText === 'Projects you proposed' ?
                      (
                        <Box
                          text={leftText === 'Projects you created' ? 'Create Project' : 'Propose Project'}
                          empty fn={() => console.log('navigate')} />
                      )
                      :
                      (
                        <View style={styles.emptyBox}>
                          <Text style={styles.textInEmptyBox}> You haven't been added to any project yet.</Text>
                        </View>
                      )
                  }
                </Fragment>
              ) : (
                  <Images
                    leftText={leftText}
                    projects={projects}
                  />
                ))
        }
      </Fragment>
    </View>
  </View>
);

Project.defaultProps = {};

Project.propTypes = {};

export default Project;
