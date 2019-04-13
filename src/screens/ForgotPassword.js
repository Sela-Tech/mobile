import React, { Component } from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import DropdownAlert from 'react-native-dropdownalert';
import DismissKeyboard from '../components/DismissKeyboard';
import Text from '../components/Text';
import Input from '../components/Input';
import Button from '../components/Button';
import IntroHeader from '../components/IntroHeader';
import ExtStyle from '../utils/styles';
import { forgotPassword } from '../utils/api';

import { DEFAULT_COLOUR, WHITE } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  boldText: {
    color: '#F2994A',
    fontSize: 22,
    fontWeight: '400',
  },
  buttomText: {
    color: '#3D4851',
    fontSize: 18,
  },
  whiteText: {
    color: WHITE,
  },
});

export default class ForgotPassword extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    emailOrPhone: '',
    emailOrPhoneError: '',
    loading: false,
  };

  reset = async () => {
    Keyboard.dismiss();
    const { emailOrPhone } = this.state;
    this.setState({ loading: true });
    try {
      const resp = await forgotPassword({
        email: emailOrPhone,
        phone: '',
      });
      this.setState({
        loading: false,
      });
      this.dropdown.alertWithType('success', 'Success', resp.data.message);
    } catch (err) {
      this.dropdown.alertWithType('error', 'Error', err.message);
      this.setState({ err: err.message, loading: false });
    }
  };

  render() {
    const { goBack } = this.props.navigation;
    const { emailOrPhoneError, loading } = this.state;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <IntroHeader fn={() => goBack()} back />
          </View>
          <View style={{ flex: 3 }}>
            <View style={{ alignItems: 'center', marginTop: '2%' }}>
              <Text style={[styles.boldText, ExtStyle.boldText]}> Forgot Password</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: '3%' }}>
              <Text style={styles.buttomText}>Enter email address or phone</Text>
              <Text style={styles.buttomText}>number you signed up with to</Text>
              <Text style={styles.buttomText}>get a password reset link</Text>
            </View>
            <View style={{ marginTop: '15%', alignItems: 'center' }}>
              <Input
                onChangeTheText={emailOrPhone => this.setState({ emailOrPhone })}
                onTheChange={() =>
                  this.setState({
                    emailOrPhoneError: false,
                    emailOrPhoneErrorMessage: '',
                    submitErrorMessage: '',
                  })
                }
                error={emailOrPhoneError}
                style={{
                  borderColor: '#696F74',
                }}
                placeHolderColor="#696F74"
                textStyle={{ color: '#696F74' }}
                text="Email Address or Phone Number"
              />
            </View>
            <View style={{ marginTop: '10%', alignItems: 'center' }}>
              <View>
                <Button
                  text="Send Reset Link"
                  color="#F2994A"
                  textColor="#FFFFFF"
                  textSize={16}
                  medium
                  fn={() => this.reset()}
                  loading={loading}
                />
              </View>
            </View>
          </View>
          <DropdownAlert
            ref={ref => (this.dropdown = ref)}
            // startDelta={height}
            // endDelta={height - height / 8}
            closeInterval={6000}
          />
        </View>
      </DismissKeyboard>
    );
  }
}
