import React, { Component } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getUserNotifications, updateUserNotifications } from '../../actions/notifications';
import Text from '../components/Text';
import Spinner from '../components/Spinner';
import SingleNotificationText from '../components/Notifications/SingleNotificationText';
import { WHITE } from '../utils/constants';
import { formattedDate } from '../utils/helpers';

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
});

// export default 
class Notifications extends Component {
  static navigationOptions = {
    title: 'Notifications',
  };

  state = {
    loading: true,
  };

  async componentDidMount() {
    await this.props.getNotifications();
    const notifications = this.props.notifications && this.props.notifications.notifications && this.props.notifications.notifications.notifications || [];
    const unreadNIds = notifications.filter(c => c.read === false).map(d => d._id);
    if (unreadNIds.length > 0) {
      this.props.updateNotifs(unreadNIds);
    }
    this.setState({ loading: false });
  }


  render() {
    const { empty, loading } = this.state;
    const notifications = this.props.notifications && this.props.notifications.notifications && this.props.notifications.notifications.notifications || [];
    // console.log('d noti', notifications);
    if (!!loading) {
      return (
        <View style={styles.spinnerCenter}>
          <Spinner />
        </View>
      )
    }
    if (notifications.length === 0) {
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
        contentContainerStyle={{ flex: 0 }}>
        {
          notifications.map((c, index) => {
            return (
              <SingleNotificationText
                key={index}
                text={c.message}
                imageSRC={c.stakeholder.profilePhoto ? { uri: c.stakeholder.profilePhoto } : require('../../assets/man1.png')}
                time={formattedDate(c.createdOn)}
              />
            )
          })
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  getNotifications: () => dispatch(getUserNotifications()),
  updateNotifs: data => dispatch(updateUserNotifications(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
