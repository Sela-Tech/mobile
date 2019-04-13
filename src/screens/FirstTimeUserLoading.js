import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import Loading from '../components/Loading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default class FirstTimeUserLoading extends Component {
  async componentDidMount() {
    try {
      await this.getKey();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  getKey = async () => {
    try {
      const key = await AsyncStorage.getItem('newUser');
      this.props.navigation.navigate(key ? 'App' : 'Auth');
    } catch (err) {
      this.props.navigation.navigate('Auth');
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
