import React, { Component } from 'react';
import LottieView from 'lottie-react-native';

export default class Test extends Component {
  render() {
    return <LottieView source={require('../../assets/animations/loading.json')} autoPlay loop />;
  }
}
