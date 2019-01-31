import React, { Fragment } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import NavigationService from '../../services/NavigationService';
import B from '../BoldText';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    height: 90,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  imgStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  flex1: {
    flex: 1,
  },
  mt5: {
    marginTop: 5,
  },
  subContainer: {
    flex: 5,
    paddingLeft: 10,
  },
});

const renderSwitch = (params, text) => {
  switch (params.type) {
    case 'INVITATION_TO_JOIN_PROJECT':
      return (
        <View style={{ marginLeft: 4 }}>
          <Text>
            <B fn={() => NavigationService.navigate('UserProfile', params.stakeholder._id)}>{params.stakeholder.firstName.concat(' ').concat(params.stakeholder.lastName)}
            </B>
            {' '}
            added you to the project
            {' '}
            <B fn={() => NavigationService.navigate('ExploreProject', params.project.id)}>
              {params.project.name}
              .
          </B>{' '}
          </Text>
        </View>
      );
    case 'YOU_SENT_INVITATION_TO_JOIN':
      return (
        <View style={{ marginLeft: 4 }}>
          <Text>
            You sent a request to
            <B fn={() => NavigationService.navigate('UserProfile', params.stakeholder._id)}>
              {` `} {params.stakeholder.firstName.concat(' ').concat(params.stakeholder.lastName)}
            </B>
            {' '}
            to  join this project
          {' '}
            <B fn={() => NavigationService.navigate('ExploreProject', params.project.id)}>
              {params.project.name}
              .
          </B>{' '}
          </Text>
        </View>
      );

    default:
      return (
        <View>
          <Text>{text}</Text>
        </View>
      );
  }
};

const SingleNotificationText = ({ text, imageSRC, time, notifs }) => (
  <View style={styles.container}>
    <View style={styles.flex1}>
      <Image source={imageSRC} style={styles.imgStyle} />
    </View>
    <View style={styles.subContainer}>
      <Fragment>{renderSwitch(notifs, text)}</Fragment>
      <View style={styles.mt5}>
        <Text> {time} </Text>
      </View>
    </View>
  </View>
);

export default SingleNotificationText;
