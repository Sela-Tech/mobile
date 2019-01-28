import React from 'react';
import { Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Left, Body, Title, Button, Right } from 'native-base';
import NavigationService from '../services/NavigationService';
import { WHITE } from '../utils/constants';

const styles = StyleSheet.create({
  buttonColor: {
    // backgroundColor: WHITE,
    backgroundColor: 'red',
  },
  headerName: {
    color: '#201D41',
  },
});

const HeaderB = ({ headerName, sideIconStatus, sideIconImage }) => (
  <Header style={{ backgroundColor: WHITE }} androidStatusBarColor="#E5E5E5">
    <Left style={{ flex: 1 }} />
    <Body style={{ alignItems: 'center', flex: 1 }}>
      <Title style={styles.headerName}>{headerName}</Title>
    </Body>

    <Right style={{ flex: 1, backgroundColor: 'blue' }}>
      {sideIconStatus ? (
        <Button
          light
          style={styles.backgroundColor}
          onPress={() => NavigationService.navigate('Notification')}
        // onPress={() => console.log('bigigi')}
        >
          <Image
            // style={{ flex: 1 }}
            resizeMode="cover"
            source={sideIconImage} />
        </Button>
      ) : null}
    </Right>
  </Header>
);

HeaderB.defaultProps = {};

HeaderB.propTypes = {};

export default HeaderB;
