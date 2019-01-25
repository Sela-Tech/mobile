import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import B from '../components/BoldText';
import UserId from '../components/Profile/UserId';
import UserInfo from '../components/Profile/UserInfo';
import SettingsList from '../components/Profile/SettingsList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
});

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <UserId settings />
        <UserInfo />
        <View style={{ marginVertical: 15 }}>
          <View style={{ marginBottom: 7, marginTop: 10, marginBottom: 10, marginLeft: 10 }}>
            <B color="#201D41"> Account Settings </B>
          </View>
          <View style={{ marginLeft: 10 }}>
            <SettingsList upText="Verification" downText="View or update verification document" />
            <SettingsList
              upText="Edit Profile"
              downText="Change your password and other personal details"
            />
            <SettingsList upText="Notifications" downText="Manage Your Notifications" />
            <SettingsList upText="About" downText="Learn more about Sela and the App" />
            <SettingsList upText="Support" downText="Contact support for help with any issue" />

            <SettingsList upText="Logout" />
          </View>
        </View>
      </ScrollView>
    );
  }
}
