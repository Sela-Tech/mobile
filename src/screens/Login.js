import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import Text from '../components/Text';
import DismissKeyboard from '../components/DismissKeyboard';
import Input from '../components/Input';
import Button from '../components/Button';
import B from '../components/BoldText';
import StandardText from '../components/StandardText';
import IntroHeader from '../components/IntroHeader';
import NavigationService from '../services/NavigationService';
import { DEFAULT_COLOUR, YELLOW, WHITE } from '../utils/constants';
import { login } from '../../actions/token';
import ExtStyle from '../utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: DEFAULT_COLOUR,
  },
  boldText: {
    color: YELLOW,
    fontSize: 30,
    fontWeight: '500',
  },
  buttomText: {
    color: WHITE,
    fontSize: 20,
  },
  whiteText: {
    color: WHITE,
  },
});

class Login extends Component {
  state = {
    emailOrPhone: '',
    password: '',
    secure: true,
    keyboard: false,
    loading: false,
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      this.keyboardDidShow(e),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e =>
      this.keyboardDidHide(e),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  showPassword = () =>
    this.setState(prevState => ({
      secure: !prevState.secure,
    }));

  keyboardDidShow() {
    return this.setState({ keyboard: true });
  }

  keyboardDidHide() {
    return this.setState({ keyboard: false });
  }

  login = async () => {
    const { emailOrPhone, password } = this.state;

    if (emailOrPhone === '' || password === '') {
      return this.setState({
        emailOrPhoneError: true,
        emailOrPhoneErrorMessage: "Email field can't be blank",
        passwordError: true,
        passwordErrorMessage: "Password Field can't be blank",
      });
    }

    if (emailOrPhone === '') {
      return this.setState({
        emailOrPhoneError: true,
        emailOrPhoneErrorMessage: "Email field can't be blank",
      });
    }
    if (password === '') {
      return this.setState({
        passwordError: true,
        passwordErrorMessage: "Password Field can't be blank",
      });
    }
    const data = {
      email: emailOrPhone,
      password,
    };
    this.setState({ submitErrorMessage: '', loading: true });
    try {
      const resp = await this.props.login(data);
      this.setState({ loading: false });
      if (resp === true) {
        return NavigationService.navigate('Project');
      }

      if (
        resp ===
        'Sela does not have an account with those user credentials. Please try another email/phone number.'
      )
        this.setState({
          submitErrorMessage: 'Wrong Username or Password',
        });
    } catch {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      secure,
      keyboard,
      loading,
      passwordError,
      passwordErrorMessage,
      emailOrPhoneError,
      emailOrPhoneErrorMessage,
      submitErrorMessage,
    } = this.state;
    const { navigation } = this.props;
    const { goBack } = navigation;
    // behavior = "behaviour"
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView style={ExtStyle.flex1} behavior="padding">
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
            <View style={{ paddingTop: 15, flex: 3 }}>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <IntroHeader fn={() => goBack()} back keyboard={keyboard} />
              </View>
              <View style={{ alignItems: 'center', flex: 2 }}>
                <View style={{ paddingTop: 30, flex: 1 }}>
                  <Text style={styles.boldText}> Log In</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 4, alignItems: 'center' }}>
              <Input
                text="Email Address or Phone Number"
                textStyle={styles.whiteText}
                onChangeTheText={emailOrPhone => this.setState({ emailOrPhone })}
                onTheChange={() =>
                  this.setState({
                    emailOrPhoneError: false,
                    emailOrPhoneErrorMessage: '',
                  })
                }
                error={emailOrPhoneError}
                errorMessage={emailOrPhoneErrorMessage}
              />
              <View style={{ marginTop: '5%' }}>
                <Input
                  onChangeTheText={password => this.setState({ password })}
                  onTheChange={() =>
                    this.setState({
                      passwordError: false,
                      passwordErrorMessage: '',
                    })
                  }
                  error={passwordError}
                  errorMessage={passwordErrorMessage}
                  text="Password"
                  showPass
                  secure={secure}
                  showPassword={this.showPassword}
                  textStyle={styles.whiteText}
                />
              </View>
              <View
                style={{
                  marginTop: '5%',
                  alignSelf: 'flex-end',
                }}
              >
                <Text
                  onPress={() => NavigationService.navigate('ForgotPassword')}
                  style={styles.buttomText}
                >
                  {` Forgot password?`}
                </Text>
              </View>
              <View style={{ marginTop: '5%', alignItems: 'center' }}>
                <Button
                  medium
                  text="Log In"
                  color={YELLOW}
                  textColor={WHITE}
                  textSize={20}
                  loading={loading}
                  fn={() => this.login()}
                />
                <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <StandardText
                    text={submitErrorMessage}
                    style={{
                      fontSize: 12,
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: keyboard ? -20 : 50,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.buttomText}>
                      {" Don't  have an account? "}
                      <B fn={() => NavigationService.navigate('OnBoarding')}> Get Started</B>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  login: data => dispatch(login(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
