import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import { getCredentials, getAccessCredentials } from '../../actions/credentials';
import { saveUserInfo } from '../../actions/userInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AuthLoading extends Component {
  async componentDidMount() {
    try {
      await Promise.all([this.getKey(true), this.getCredentials(true)]);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  getKey = async () => {
    let parsedKey;
    if (!(this.props.userInfo && this.props.userInfo.user && this.props.userInfo.user.token)) {
      try {
        const key = await AsyncStorage.getItem('user');
        parsedKey = JSON.parse(key);
        global.userToken = parsedKey.token;
        this.props.saveUserInfos(parsedKey);
        this.props.navigation.navigate(parsedKey ? 'AppHome' : 'AuthHome');
      } catch (err) {
        this.props.navigation.navigate('AuthHome');
      }
    }
    parsedKey = this.props.userInfo.user.token;
    global.userToken = parsedKey;
    this.props.navigation.navigate(parsedKey ? 'AppHome' : 'AuthHome');
  };

  getCredentials = async () => {
    const cred = this.props && this.props.credentials && this.props.credentials.credentials;
    if (Object.keys(cred).length < 0) {
      try {
        await this.props.getPassCredentials();
        if (this.props && this.props.credentials && this.props.credentials.credentials !== null) {
          return true;
        }
        if (this.props && this.props.credentials && this.props.credentials.credentials === '') {
          await this.props.getAccessCredentials();
        }
        await this.props.getAccessCredentials();
      } catch (err) {
        await this.props.getAccessCredentials();
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  credentials: state.credentials,
});

const mapDispatchToProps = dispatch => ({
  saveUserInfos: data => dispatch(saveUserInfo(data)),
  getPassCredentials: () => dispatch(getCredentials()),
  getAccessCredentials: () => dispatch(getAccessCredentials()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoading);
