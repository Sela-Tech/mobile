import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage,
  Keyboard,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Text from '../components/Text';
import DismissKeyboard from '../components/DismissKeyboard';
import Input from '../components/Input';
import Button from '../components/Button';
import B from '../components/BoldText';
import StandardText from '../components/StandardText';
import IntroHeader from '../components/IntroHeader';
import NavigationService from '../services/NavigationService';
import { YELLOW, WHITE } from '../utils/constants';
import { isEmail } from '../utils/helpers';
import { login } from '../../actions/token';
import { getAccessCredentials } from '../../actions/credentials';
import ExtStyle from '../utils/styles';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  boldText: {
    color: '#201D41',
    fontSize: 30,
    fontWeight: '400',
  },
  buttomText: {
    color: '#3D4851',
    fontSize: 16,
  },
  whiteText: {
    color: WHITE,
  },
  headerUp: {
    flex: 3,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  headerUpCont: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginTextView: {
    alignItems: 'center',
    flex: 1,
  },
  loginText: {
    paddingTop: 30,
    flex: 1,
  },
  inputContainer: {
    flex: 3,
    alignItems: 'flex-start',
  },
  mt5: {
    marginTop: '5%',
  },
  bottomContainer: {
    marginTop: '5%',
    alignSelf: 'flex-end',
  },
  otherBottomContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fs12: {
    fontSize: 12,
    color: 'red',
  },
  bottomBottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomAbsolute: {
    flexDirection: 'row',
    alignItems: 'center',
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
    AsyncStorage.getItem('emailOrPhone')
      .then(emailOrPhone => {
        if (emailOrPhone) this.setState({ emailOrPhone });
      })
      .catch(() => false);

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

  keyboardDidShow = () => {
    this.setState({ keyboard: true });
  };

  keyboardDidHide = () => {
    this.setState({ keyboard: false });
  };

  login = async () => {
    const { emailOrPhone, password } = this.state;
    AsyncStorage.setItem('emailOrPhone', emailOrPhone.trim());
    Keyboard.dismiss();

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
    if (emailOrPhone === '' || password === '') {
      return this.setState({
        emailOrPhoneError: true,
        emailOrPhoneErrorMessage: "Email field can't be blank",
        passwordError: true,
        passwordErrorMessage: "Password Field can't be blank",
      });
    }

    const data = {
      email: isEmail(emailOrPhone) ? emailOrPhone.trim() : '',
      phone: !isEmail(emailOrPhone) ? emailOrPhone.trim() : '',
      password,
    };

    this.setState({ submitErrorMessage: '', loading: true });
    try {
      const resp = await this.props.login(data);
      this.props.getCred();

      this.setState({ loading: false });
console.log('jsjjjj', resp);

      if (resp && resp.response === undefined) {
        this.dropdown.alertWithType('error', 'Error', 'No internet Connection');
      }

      if (resp.status === true) {
        return NavigationService.navigate('Project');
      }

      if (
        resp.message ===
        'Sela does not have an account with those user credentials. Please try another email/phone number.'
      ) {
        this.setState({
          submitErrorMessage: 'Wrong Username or Password',
        });
        this.dropdown.alertWithType('error', 'Error', resp.message);
      } else if (resp === false) {
        this.dropdown.alertWithType('error', 'Error', resp.message);
      } else {
        this.dropdown.alertWithType('error', 'Error', resp.message);
      }
    } catch (error) {
      this.setState({ loading: false });
      this.dropdown.alertWithType('error', 'Error', error.message);
    }
  };

  render() {
    const {
      emailOrPhone,
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
            <View style={styles.headerUp}>
              <View style={styles.headerUpCont}>
                <IntroHeader fn={() => goBack()} keyboard={keyboard} />
              </View>
              <View style={styles.loginTextView}>
                <View style={styles.loginText}>
                  <Text style={styles.boldText}> Log In</Text>
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <Input
                text="Email Address or Phone Number"
                value={emailOrPhone}
                textStyle={styles.whiteText}
                onChangeTheText={emailOrPhone => this.setState({ emailOrPhone })}
                onTheChange={() =>
                  this.setState({
                    emailOrPhoneError: false,
                    emailOrPhoneErrorMessage: '',
                    submitErrorMessage: '',
                  })
                }
                style={{
                  borderColor: '#696F74',
                }}
                placeHolderColor="#696F74"
                textStyle={{ color: '#696F74' }}
                error={emailOrPhoneError}
                errorMessage={emailOrPhoneErrorMessage}
              />
              <View style={styles.mt5}>
                <Input
                  onChangeTheText={password => this.setState({ password })}
                  onTheChange={() =>
                    this.setState({
                      passwordError: false,
                      passwordErrorMessage: '',
                      submitErrorMessage: '',
                    })
                  }
                  style={{
                    borderColor: '#696F74',
                  }}
                  placeHolderColor="#696F74"
                  error={passwordError}
                  errorMessage={passwordErrorMessage}
                  text="Password"
                  showPass
                  secure={secure}
                  showPassword={this.showPassword}
                  textStyle={{ color: '#696F74' }}
                />
              </View>
              <View style={styles.bottomContainer}>
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
                  textSize={16}
                  loading={loading}
                  fn={() => this.login()}
                />
                <View style={styles.otherBottomContainer}>
                  <StandardText text={submitErrorMessage} style={styles.fs12} />
                </View>
              </View>
            </View>
            <View style={styles.bottomBottom}>
              <View
                style={{
                  position: 'absolute',
                  bottom: keyboard ? -20 : height / 10,
                }}
              >
                <View style={styles.bottomAbsolute}>
                  <View>
                    <Text style={styles.buttomText}>
                      {" Don't  have an account? "}
                      <B fn={() => NavigationService.navigate('OnBoarding')}> Create account </B>
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <DropdownAlert
              ref={ref => (this.dropdown = ref)}
              startDelta={height}
              endDelta={height - height / 8}
              closeInterval={6000}
            />
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
  getCred: () => dispatch(getAccessCredentials()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
