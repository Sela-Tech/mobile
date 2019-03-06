import React, { Fragment } from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Body, Icon, Title, Button, Right } from 'native-base';
import Text from './Text';
import NavigationService from '../services/NavigationService';
import { isAndroid } from '../utils/helpers';
import ExtStyle from '../utils/styles';
import { YELLOW, WHITE } from '../utils/constants';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonColor: {
    // backgroundColor: WHITE,
    backgroundColor: 'red',
  },
  headerName: {
    color: '#201D41',
    fontFamily: isAndroid ? 'ProximaNova' : null,
  },
  header: {
    backgroundColor: '#F6F6F6',
  },
  bodyStyle: {
    alignItems: 'center',
    flex: 1,
  },
  button: {
    elevation: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
  },
  ml3: {
    marginLeft: 3,
  },
  rightButton: {
    elevation: 0,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    backgroundColor: YELLOW,
    width: width / 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  rightText: {
    fontSize: 14,
    color: WHITE,
  },
  bodyText: {
    color: '#201D41',
    fontSize: 18,
  },
});

const HeaderB = ({
  navigation,
  justBack,
  positionLeft,
  headerName,
  sideIconStatus,
  sideIconImage,
  complete,
  rightText,
  bodyText,
}) => (
    <Header style={styles.header} androidStatusBarColor="#E5E5E5">
      <Fragment>
        {
          complete ? (
            <Fragment>
              <Left style={ExtStyle.flex1}>
                <Button
                  onPress={() => navigation.goBack()}
                  style={ExtStyle.row}
                  transparent
                >
                  <View>
                    <Image source={require('../../assets/ddep-blue-black.png')} />
                  </View>
                </Button>
              </Left>
              <Body style={ExtStyle.flex1}>
                <Title style={styles.bodyText}>{bodyText}</Title>
              </Body>
              <Right style={ExtStyle.flex1}>
                <Button
                  onPress={() => alert('hhdhfhh')}
                  style={styles.rightButton}
                >
                  <Text style={styles.rightText}>{rightText}</Text>
                </Button>
              </Right>
            </Fragment>
          ) : (
              <Fragment>
                {
                  justBack ? (
                    <Fragment>
                      <Left>
                        <Button
                          onPress={() => navigation.goBack()}
                          style={ExtStyle.row}
                          transparent
                        >
                          <View>
                            <Image source={require('../../assets/ddep-blue-black.png')} />
                          </View>
                          <View style={styles.ml3}>
                            <Text style={{ color: '#201D41' }}> Back</Text>
                          </View>
                        </Button>
                      </Left>
                      <Body />
                      <Right />
                      {/* </Right> */}
                    </Fragment>
                  ) : (
                      <Fragment>
                        {positionLeft ? (
                          <View>
                            <Left>
                              <Button light style={styles.button} onPress={() => console.log('k')} />
                              <Body style={styles.bodyStyle}>
                                <Title style={styles.headerName}>{headerName}</Title>
                              </Body>
                            </Left>
                          </View>
                        ) : (
                            <Fragment>
                              <Left style={ExtStyle.flex1} />
                              <Body style={styles.bodyStyle}>
                                <Title style={styles.headerName}>{headerName}</Title>
                              </Body>

                              <Right style={ExtStyle.flex1}>
                                {sideIconStatus ? (
                                  <Button
                                    light
                                    style={styles.button}
                                    onPress={() => NavigationService.navigate('Notification')}
                                  >
                                    <Image resizeMode="cover" source={sideIconImage} />
                                  </Button>
                                ) : null}
                              </Right>
                            </Fragment>
                          )}
                      </Fragment>
                    )}
              </Fragment>
            )
        }
      </Fragment>
    </Header>
  );

HeaderB.defaultProps = {};

HeaderB.propTypes = {};

export default HeaderB;
