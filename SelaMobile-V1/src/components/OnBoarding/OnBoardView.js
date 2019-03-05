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
    color: "#696F74",
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
            <B
              size={24}
              weight="400"
              color="#201D41"
            >
              Create account
            </B>
            <Text style={{ fontSize: 16, color: '#3D4851' }}>{!second ? 'Select your role ' : 'Enter your personal details'}  </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: '2%',
            }}
          >
            <Text style={{ color: WHITE, fontSize: 15 }}>
              {second ? 'Enter your personal details' : null}
            </Text>
          </View>
          <View
            style={{
              marginTop: !second ? '2%' : !state.keyboard ? '10%' : '4%',
              alignItems: 'center',
            }}
          >
            {second ? (
              <Fragment>
                <View>
                  <Input
                    style={{
                      borderColor: '#696F74'
                    }}
                    placeHolderColor="#696F74"
                    text="Please enter first and last name"
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
                    style={{
                      borderColor: '#696F74'
                    }}
                    placeHolderColor="#696F74"
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
                    style={{
                      borderColor: '#696F74'
                    }}
                    placeHolderColor="#696F74"
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
                <View>
                  <Box
                    style={{
                      borderColor: '#696F74'
                    }}
                    textColor={state.role === 'funder' ? WHITE : "#3D4851"}
                    upText="Project Funder"
                    downText="I want to fund projects"
                    fn={() => changeRole('funder')}
                    color={state.role === 'funder' ? '#201D41' : null}
                    checked
                    textSize={12}
                    below
                  />
                  <Box
                    style={{
                      borderColor: '#696F74'
                    }}
                    upText="Contractor"
                    downText="I want to propose and execute projects"
                    fn={() => changeRole('contractor')}
                    textColor={state.role === 'contractor' ? WHITE : "#3D4851"}
                    textSize={12}
                    color={state.role === 'contractor' ? '#201D41' : null}
                    below
                  />
                  <Box
                    style={{
                      borderColor: '#696F74'
                    }}
                    textColor={state.role === 'evaluator' ? WHITE : "#3D4851"}
                    upText="Evaluation Agent"
                    downText="I want to validate projects in my community"
                    fn={() => changeRole('evaluator')}
                    textSize={12}
                    color={state.role === 'evaluator' ? '#201D41' : null}
                    below
                  />
                </View>
              )}
          </View>
          <View style={{ marginTop: '4%', alignItems: 'center' }}>
            <Button
              text={second ? 'Submit' : 'Next'}
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
