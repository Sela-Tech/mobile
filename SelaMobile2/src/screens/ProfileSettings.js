import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import B from '../components/BoldText';
import UserId from '../components/Profile/UserId';
import UserInfo from '../components/Profile/UserInfo';
import SettingsList from '../components/Profile/SettingsList';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexGrow: 1,
  },
  headerMargin: {
    marginTop: 15,
  },
  accountSettingsView: {
    marginVertical: 10,
    marginLeft: 10,
  },
  mv15: {
    marginVertical: 15,
  },
  ml10: {
    marginLeft: 10,
  },
});

class ProfileSettings extends Component {
  render() {
    const userInfo = this.props.userInfo;
    let userType;
    const { isContractor, isFunder, isEvalautor } = this.props.userInfo.user;
    if (isFunder === true) {
      userType = 'Funder';
    } else if (isContractor === true) {
      userType = 'Contractor';
    } else {
      userType = 'Evaluation agent';
    }
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header headerName="PROFILE" />
        <View style={styles.headerMargin}>
          <UserId
            settings
            userType={userType}
            userName={userInfo.user.firstName.concat(' ').concat(userInfo.user.lastName)}
            verificationStatus="verified"
          />
        </View>
        <UserInfo reputationScore="0" projects="0" dataUploads="0" location="Lagos,Nigeria." />
        <View style={styles.mv15}>
          <View style={styles.accountSettingsView}>
            <B color="#201D41"> Account Settings </B>
          </View>
          <View style={styles.ml10}>
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

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

export default connect(mapStateToProps)(ProfileSettings);
