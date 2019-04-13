import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getUserNotifications, updateUserNotifications } from '../../actions/notifications';
import Text from '../components/Text';
import Spinner from '../components/Spinner';
import SingleNotificationText from '../components/Notifications/SingleNotificationText';
import { WHITE } from '../utils/constants';
import { formattedDate, sortNotificationsByDate, isAndroid } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: WHITE,
  },
  spinnerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex0: {
    flex: 0,
  },
});

class Notifications extends Component {
  static navigationOptions = () => ({
    title: 'Notifications',
    headerTitleStyle: {
      color: '#201D41',
      fontWeight: '400',
      fontFamily: isAndroid ? 'Acumin-RPro' : null,
      fontSize: 18,
    },
  });

  state = {
    loading: true,
  };

  async componentDidMount() {
    await this.getNotifications();
  }

  getNotifications = async () => {
    const notifications =
      (this.props &&
        this.props.notifications &&
        this.props.notifications.notifications &&
        this.props.notifications.notifications.notifications) ||
      [];

    try {
      if (notifications && notifications.length !== 0) {
        this.setState({ loading: false });
      }
      await this.props.getNotifications();
      const unreadNIds =
        notifications && notifications.filter(c => c.read === false).map(d => d._id);
      if (unreadNIds && unreadNIds.length > 0) {
        this.props.updateNotifs(unreadNIds);
      }
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  render() {
    const { loading } = this.state;
    let notifications =
      (this.props &&
        this.props.notifications &&
        this.props.notifications.notifications &&
        this.props.notifications.notifications.notifications) ||
      [];
    notifications = sortNotificationsByDate(notifications);
    if (loading) {
      return (
        <View style={styles.spinnerCenter}>
          <Spinner />
        </View>
      );
    }

    if ((notifications && notifications.length === 0) || notifications === undefined) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image source={require('../../assets/docs.png')} />
          </View>
          <View style={{ alignItems: 'center', margin: 10 }}>
            <Text style={{ color: '#201D41' }}> You have not received any </Text>
            <Text style={{ color: '#201D41' }}> notifications yet.</Text>
          </View>
        </View>
      );
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.flex0}
      >
        {notifications &&
          notifications.map((c, index) => (
            <SingleNotificationText
              notifs={c}
              key={index}
              text={c.message}
              action={c.action}
              imageSRC={
                c.stakeholder.profilePhoto
                  ? { uri: c.stakeholder.profilePhoto }
                  : require('../../assets/man1.png')
              }
              time={formattedDate(c.createdOn)}
            />
          ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  getNotifications: () => dispatch(getUserNotifications()),
  updateNotifs: data => dispatch(updateUserNotifications(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
