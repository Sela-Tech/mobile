import React, { Component, Fragment } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import Text from '../components/Text';
import DismissKeyboard from '../components/DismissKeyboard';
import Input from '../components/Input';
import Button from '../components/Button';
import B from '../components/BoldText';
import IntroHeader from '../components/IntroHeader';
import NavigationService from '../services/NavigationService';
import { DEFAULT_COLOUR, YELLOW, WHITE } from '../utils/constants';
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

export default class Login extends Component {
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
    console.log('here')
    console.log('ththth', this.state);
    this.setState({ loading: true });
    try {
      // conat resp =
      return NavigationService.navigate('Project');
      this.setState({ loading: false });
    }
    catch{
      this.setState({ loading: false });
    }
  }

  render() {
    const { secure, keyboard, loading } = this.state;
    const { navigation } = this.props;
    const { goBack } = navigation;
    // behavior = "behaviour"
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView style={ExtStyle.flex1} behavior="padding">
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
            <View style={{ flex: 3 }}>
              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <IntroHeader fn={() => goBack()} back keyboard={keyboard} />
              </View>
              <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 2 }}>
                <View style={{ paddingTop: 30, justifyContent: 'flex-end', flex: 1 }}>
                  <Text style={styles.boldText}> Log In</Text>
                </View>
                <View style={{ alignItems: 'center', flex: 2, marginTop: 10 }}>
                  <Text style={styles.buttomText}> Welcome back ! Enter your details </Text>
                  <Text style={styles.buttomText}> below to log into your account </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 3, }}>
              <Input
                text="Email Address or Phone Number"
                textStyle={styles.whiteText}
                onChangeTheText={emailOrPhone => this.setState({ emailOrPhone })}
              // medium={true}
              />
              <View style={{ marginTop: '5%' }}>
                <Input
                  onChangeTheText={password => this.setState({ password })}
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
              <View style={{ marginTop: '5%' }}>
                <Button
                  medium
                  text="Log In"
                  color={YELLOW}
                  textColor={WHITE}
                  textSize={20}
                  loading={loading}
                  fn={() => this.login()}
                />
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: keyboard ? -20 : 30,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                    <Text style={styles.buttomText}>
                      {' Don/t have an account? '}
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
