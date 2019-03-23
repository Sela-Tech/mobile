import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import NavigationService from '../../services/NavigationService';
import Button from '../Button';
import B from '../BoldText';
import Text from '../Text';
import { WHITE } from '../../utils/constants';
import { performActionOnProject } from '../../utils/api';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height / 8, // 90
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
            <B fn={() => NavigationService.navigate('UserProfile', params.stakeholder._id)}>
              {params.stakeholder.firstName.concat(' ').concat(params.stakeholder.lastName)}
            </B>{' '}
            added you to the project{' '}
            <B fn={() => NavigationService.navigate('ExploreProject', params.project.id)}>
              {params.project.name}.
            </B>
{' '}
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
            </B>{' '}
            to join this project{' '}
            <B fn={() => NavigationService.navigate('ExploreProject', params.project.id)}>
              {params.project.name}.
            </B>
{' '}
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

// const SingleNotificationText = ({ text, imageSRC, time, notifs }) => (
export default class SingleNotificationText extends Component {
  state = {
    expand: this.props.action,
  };

  performAction = async agreed => {
    this.setState({ expand: 'done' });
    try {
      const rr = await performActionOnProject({
        projectId: this.props.notifs.project.id,
        notificationId: this.props.notifs._id,
        agreed:  agreed === 'true'? true: false,
      });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { text, imageSRC, time, notifs } = this.props;
    const { expand } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.flex1}>
          <Image source={imageSRC} style={styles.imgStyle} />
        </View>
        <View style={styles.subContainer}>
          <Fragment>{renderSwitch(notifs, text)}</Fragment>

          <Fragment>
            {expand === 'REQUIRED' ? (
              <View style={{ flexDirection: 'row' }}>
                <Button
                  fn={() => this.performAction('true')}
                  style={{ width: width / 4, height: height / 20 }}
                  text="Accept"
                />
                <Button
                  fn={() => this.performAction('false')}
                  textColor={WHITE}
                  style={{
                    backgroundColor: '#0A2C56',
                    marginLeft: 10,
                    width: width / 4,
                    height: height / 20,
                  }}
                  text="Decline"
                />
              </View>
            ) : null}
          </Fragment>
          <View style={styles.mt5}>
            <Text> {time} </Text>
          </View>
        </View>
      </View>
    );
  }
}
