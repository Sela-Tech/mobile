import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Body, Title, Button, Right } from 'native-base';
import NavigationService from '../services/NavigationService';
import { WHITE } from '../utils/constants';
import ExtStyle from '../utils/styles';

const styles = StyleSheet.create({
  buttonColor: {
    // backgroundColor: WHITE,
    backgroundColor: 'red',
  },
  headerName: {
    color: '#201D41',
  },
  header: {
    backgroundColor: '#F6F6F6',
    borderWidth: 0.3,
    borderTopColor: '#222829',
    borderBottomColor: '#222829',

    // borderBottomWidth: 0.4,
    // borderBottomColor: '#000000',
    // shadowColor: '#000000',
    // elevation: 6,
    // shadowOpacity: 0.5,
    // shadowRadius: 2,
    // shadowOffset: {
    //   height: 10,
    //   width: 10,
    // },
  },
  bodyStyle: {
    alignItems: 'center',
    flex: 1,
  },
  button: {
    elevation: 0,
  },
});

const HeaderB = ({ headerName, sideIconStatus, sideIconImage }) => (
  <Header style={styles.header} androidStatusBarColor="#E5E5E5">
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
          <Image
            resizeMode="cover" source={sideIconImage} />
        </Button>
      ) : null}
    </Right>
  </Header>
);

HeaderB.defaultProps = {};

HeaderB.propTypes = {};

export default HeaderB;
