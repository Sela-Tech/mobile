import React, { Fragment } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';
import StandardText from '../StandardText';
import Input from '../Input';
import B from '../BoldText';
import Box from '../Box';
import Button from '../Button';
import { WHITE, YELLOW } from '../../utils/constants';

const styles = {
  buttomText: {
    color: WHITE,
    fontSize: 15,
  },
  whiteText: {
    color: WHITE,
  },
};

const OnBoardView = ({
  second,
  currentPage,
  changePage,
  state,
  changeRole,
  secure,
  navigate,
  showPassword,
  changeFullNameFn,
  passwordFn,
  emailOrPhoneFn,
  onTheChangeFullName,
  onTheChangePassword,
  onTheChangeEmailOrPhone,
  signUp,
}) => (
    <Fragment>
      <View
        style={{
          marginTop: !second ? '2%' : !state.keyboard ? '7%' : null, // '5%',
          flex: 6,
          alignItems: 'center',
        }}
      >
        <View>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <B color={YELLOW} size={22}>
              {second ? ` Your Personal Details` : ` Your Role`}
            </B>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: '2%',
            }}
          >
            <Text style={{ color: WHITE, fontSize: 15 }}>
              {second ? 'Great! Now enter your personal' : 'Begin by selecting your role as a'}
            </Text>
            <Text style={{ color: WHITE, fontSize: 15 }}>
              {second ? 'details to set up your account' : 'Sela citizen'}
            </Text>
          </View>
          <View style={{ marginTop: !second ? '4%' : !state.keyboard ? '15%' : '5%', alignItems: 'center' }}>
            {second ? (
              <Fragment>
                <View>
                  <Input
                    text="Full Name"
                    medium
                    textStyle={styles.whiteText}
                    onChangeTheText={fullName => changeFullNameFn(fullName)}
                    onTheChange={() => onTheChangeFullName()}
                    error={state.fullNameError}
                    errorMessage={state.fullNameErrorMessage}

                  />
                </View>
                <View style={{ marginTop: '4%' }}>
                  <Input
                    text="Email Address or Phone Number"
                    medium
                    textStyle={styles.whiteText}
                    onChangeTheText={emailOrPhone => emailOrPhoneFn(emailOrPhone)}
                    onTheChange={() => onTheChangeEmailOrPhone()}
                    error={state.emailOrPhoneError}
                    errorMessage={state.emailOrPhoneErrorMessage}
                  />
                </View>
                <View style={{ marginTop: '4%' }}>
                  <Input
                    text="Password"
                    showPass
                    secure={secure}
                    // medium
                    onChangeTheText={password => passwordFn(password)}
                    textStyle={styles.whiteText}
                    showPassword={showPassword}
                    onTheChange={() => onTheChangePassword()}
                    error={state.passwordError}
                    errorMessage={state.passwordErrorMessage}
                  />
                </View>
              </Fragment>
            ) : (
                <Fragment>
                  <Box
                    upText="Project Funder"
                    downText="I want to manage or track projects I fund"
                    fn={() => changeRole('funder')}
                    textColor={WHITE}
                    color={state.role === 'funder' ? YELLOW : null}
                    checked
                    textSize={12}
                    below
                  />
                  <Box
                    upText="Contractor"
                    downText="I want to track the progress of my project"
                    fn={() => changeRole('contractor')}
                    textColor={WHITE}
                    textSize={12}
                    color={state.role === 'contractor' ? YELLOW : null}
                    below
                  />
                  <Box
                    upText="Evaluation Agent"
                    downText="I want to help validate projects  around me"
                    fn={() => changeRole('evaluator')}
                    textColor={WHITE}
                    textSize={12}
                    color={state.role === 'evaluator' ? YELLOW : null}
                    below
                  />
                </Fragment>
              )}
          </View>
          <View style={{ marginTop: '4%', alignItems: 'center' }}>
            <Button
              text={second ? 'Get Started' : 'Next'}
              color={YELLOW}
              textColor={WHITE}
              loading={state.loading}
              fn={() => {
                currentPage === 0 ? changePage() : signUp();
              }}
              medium
            />
            <View style={{ marginTop: 10 }}>
              <StandardText text={state.submitErrorMessage} />
            </View>
          </View>
        </View>
      </View>
      <Fragment>
        {!second ? (
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              left: 0,
              right: 0,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View>
                <Text style={styles.buttomText}>
                  {` Already have an account? `}
                  <B fn={() => navigate('Login')}>Log In </B>
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </Fragment>
    </Fragment>
  );

OnBoardView.propTypes = {
  second: PropTypes.bool,
  state: PropTypes.object.isRequired,
};

export default OnBoardView;
