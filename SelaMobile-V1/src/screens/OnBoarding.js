import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import DropdownAlert from 'react-native-dropdownalert';
import NavigationService from '../services/NavigationService';
import StepIndicator from '../components/npm/StepIndicator';
import DismissKeyboard from '../components/DismissKeyboard';
import IntroHeader from '../components/IntroHeader';
import OnBoardView from '../components/OnBoarding/OnBoardView';
import { signUp } from '../utils/api';
import ExtStyle from '../utils/styles';
import { DEFAULT_COLOUR, WHITE, YELLOW } from '../utils/constants';
// import { WHITE } from '../../../SelaMobile2/src/utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  stepIndicator: {
    marginVertical: '4%',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const firstIndicatorStyles = {
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 10,
  currentStepStrokeWidth: 5,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: YELLOW,
};

export default class OnBoarding extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      currentPage: 0,
      keyboard: false,
      fullName: '',
      emailOrPhone: '',
      password: '',
      role: 'funder',
      secure: true,
      isEvaluator: false,
      isContractor: false,
      isFunder: true,
      loading: false,
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      this.keyboardDidShow(e),
    );
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', e =>
      this.keyboardDidHide(e),
    );
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { currentPage } = this.state;
    if (nextState.currentPage !== currentPage) {
      if (this.viewPager) {
        this.viewPager.setPage(nextState.currentPage);
      }
    }
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  showPassword = () => this.setState(prevState => ({ secure: !prevState.secure }));

  changePage = () =>
    this.setState(prevState => ({
      currentPage:
        prevState.currentPage === 0 ? prevState.currentPage + 1 : prevState.currentPage - 1,
    }));

  changeRole = role => {
    if (role === 'funder') {
      this.setState({
        role,
        isEvaluator: false,
        isContractor: false,
        isFunder: true,
      });
    } else if (role === 'contractor') {
      this.setState({
        role,
        isEvaluator: false,
        isContractor: true,
        isFunder: false,
      });
    } else {
      this.setState({
        role,
        isEvaluator: true,
        isContractor: false,
        isFunder: false,
      });
    }
  };

  keyboardDidShow() {
    return this.setState({ keyboard: true });
  }

  keyboardDidHide() {
    return this.setState({ keyboard: false });
  }

  fullNameFn = fullName => this.setState({ fullName });

  passwordFn = password => this.setState({ password });

  emailOrPhoneFn = emailOrPhone => this.setState({ emailOrPhone });

  onTheChangeFullName = () => {
    this.setState({
      fullNameError: false,
      fullNameErrorMessage: '',
    });
  };

  onTheChangePassword = () => {
    this.setState({
      passwordError: false,
      passwordErrorMessage: '',
    });
  };

  onTheChangeEmailOrPhone = () => {
    this.setState({
      emailOrPhoneError: false,
      emailOrPhoneErrorMessage: '',
    });
  };

  signUp = async () => {
    Keyboard.dismiss();
    const { fullName, emailOrPhone, password, isFunder, isEvaluator, isContractor } = this.state;
    if (emailOrPhone === '' && password === '' && fullName === '') {
      return this.setState({
        emailOrPhoneError: true,
        emailOrPhoneErrorMessage: "Email field can't be blank",
        passwordError: true,
        passwordErrorMessage: "Password Field can't be blank",
        fullNameError: true,
        fullNameErrorMessage: "Full Name field can't be blank",
      });
    }
    if (emailOrPhone === '' && password === '') {
      return this.setState({
        emailOrPhoneError: true,
        emailOrPhoneErrorMessage: "Email field can't be blank",
        passwordError: true,
        passwordErrorMessage: "Password Field can't be blank",
      });
    }
    if (emailOrPhone === '' && fullName === '') {
      return this.setState({
        emailOrPhoneError: true,
        emailOrPhoneErrorMessage: "Email field can't be blank",
        fullNameError: true,
        fullNameErrorMessage: "Full Name field can't be blank",
      });
    }
    if (password === '' && fullName === '') {
      return this.setState({
        passwordError: true,
        passwordErrorMessage: "Password Field can't be blank",
        fullNameError: true,
        fullNameErrorMessage: "Full Name field can't be blank",
      });
    }
    if (fullName === '') {
      return this.setState({
        fullNameError: true,
        fullNameErrorMessage: "Full Name field can't be blank",
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
    if (password.length < 8) {
      return this.setState({
        passwordError: true,
        passwordErrorMessage: 'Password should contain 8 characters or more',
      });
    }
    if (fullName.split(' ')[1] === undefined) {
      return this.setState({
        fullNameError: true,
        fullNameErrorMessage: 'Please enter fullName',
      });
    }
    const data = {
      email: emailOrPhone,
      phone: '89490358564',
      organization: {
        id: '',
        name: 'admin1 organisaction',
      },
      firstName: fullName.split(' ')[0],
      lastName: fullName.split(' ')[1] === undefined ? '' : fullName.split(' ')[1],
      username: fullName,
      isEvaluator,
      isContractor,
      isFunder,
      password,
      // profilePhoto: 'https://placehold.it/200',
    };
    this.setState({
      submitErrorMessage: '',
      loading: true,
    });

    try {
      const resp = await signUp(data);
      this.setState({ loading: false });
      if (resp && resp.response && resp.response.data.message) {
        this.dropdown.alertWithType('error', 'Error', resp.response.data.message);
      }
      if (resp && resp.data && resp.data.success === true) {
        return NavigationService.navigate('SignUpSuccess');
      }

      this.dropdown.alertWithType('error', 'Error', resp.data.message);
      this.setState({
        submitErrorMessage: resp.data.message,
      });
    } catch (err) {
      this.dropdown.alertWithType('error', 'Error', 'Registration failed');
      this.setState({ loading: false, error: err.message });
    }
  };

  render() {
    const { navigation } = this.props;
    const { goBack, navigate } = navigation;
    const { currentPage, keyboard, secure } = this.state;

    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled
        keyboardShouldPersistTaps="always"
      >
        <DismissKeyboard>
          <KeyboardAvoidingView style={ExtStyle.flex1} behavior="padding">
            <View style={styles.container}>
              <View
                style={{
                  flex: 3,
                  justifyContent: 'flex-end',
                }}
              >
                <View>
                  <IntroHeader
                    fn={() => (currentPage === 1 ? this.changePage() : goBack())}
                    back
                    keyboard={keyboard}
                  />
                </View>
                {/* <View style={styles.stepIndicator}>
                  <StepIndicator
                    stepCount={3}
                    customStyles={firstIndicatorStyles}
                    currentPosition={currentPage}
                  />
                </View> */}
              </View>
              <View style={{ flex: 5 }}>
                {currentPage === 0 ? (
                  <OnBoardView
                    currentPage={currentPage}
                    changePage={this.changePage}
                    state={this.state}
                    secure={secure}
                    changeRole={this.changeRole}
                    navigate={navigate}
                    showPassword={this.showPassword}
                  />
                ) : (
                  <OnBoardView
                    second
                    currentPage={currentPage}
                    changePage={this.changePage}
                    secure={secure}
                    state={this.state}
                    changeRole={this.changeRole}
                    navigate={navigate}
                    showPassword={this.showPassword}
                    changeFullNameFn={this.fullNameFn}
                    passwordFn={this.passwordFn}
                    emailOrPhoneFn={this.emailOrPhoneFn}
                    onTheChangeEmailOrPhone={this.onTheChangeEmailOrPhone}
                    onTheChangeFullName={this.onTheChangeFullName}
                    onTheChangePassword={this.onTheChangePassword}
                    signUp={this.signUp}
                  />
                )}
              </View>
              <DropdownAlert ref={ref => (this.dropdown = ref)} closeInterval={6000} />
            </View>
          </KeyboardAvoidingView>
        </DismissKeyboard>
      </ScrollView>
    );
  }
}
