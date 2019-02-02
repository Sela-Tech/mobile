import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Body, Title, Button, Right } from 'native-base';
import NavigationService from '../services/NavigationService';
import { isAndroid } from '../utils/helpers';
import ExtStyle from '../utils/styles';

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
