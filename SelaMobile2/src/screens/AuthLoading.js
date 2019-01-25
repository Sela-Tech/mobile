import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import { saveUserInfo } from '../../actions/userInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AuthLoading extends Component {
  async componentDidMount() {
    try {
      await this.getKey();
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
});

const mapDispatchToProps = dispatch => ({
  saveUserInfos: data => dispatch(saveUserInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthLoading);
