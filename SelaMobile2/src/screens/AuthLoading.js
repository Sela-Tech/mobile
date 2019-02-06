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
    // AsyncStorage.removeItem('user');
    try {
      await Promise.all([this.getCredentials(true), this.getKey(true)]);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  getKey = async () => {
    try {
      const key = await AsyncStorage.getItem('user');
      const parsedKey = JSON.parse(key);
      global.userToken = parsedKey.token;
      this.props.saveUserInfos(parsedKey);
      this.props.navigation.navigate(key ? 'AppHome' : 'AuthHome');
    } catch (err) {
      this.props.navigation.navigate('AuthHome');
    }
  };

  getCredentials = async () => {
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
