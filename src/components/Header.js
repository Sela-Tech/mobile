import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Body, Title, Button, Right } from 'native-base';
import NavigationService from '../services/NavigationService';
import { WHITE } from '../utils/constants';

const styles = StyleSheet.create({
  buttonColor: {
    backgroundColor: WHITE,
  },
  headerName: {
    color: "#201D41",
  }
});

const HeaderB = ({ headerName, sideIconStatus, sideIconImage }) => (
  <Header style={{ backgroundColor: WHITE }} androidStatusBarColor="#E5E5E5">
    <Left style={{ flex: 1 }} />
    <Body style={{ alignItems: 'center', flex: 1 }}>
      <Title style={styles.headerName}>{headerName}</Title>
    </Body>

    <Right style={{ flex: 1 }}>
      {
        sideIconStatus ? (
          <Button
            style={styles.backgroundColor}
            onPress={() => NavigationService.navigate('Notification')}>
            <Image source={sideIconImage} />
          </Button>
        ) : null}
    </Right>
  </Header>
);

HeaderB.defaultProps = {

};

HeaderB.propTypes = {

};

export default HeaderB;
