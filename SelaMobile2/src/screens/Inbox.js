import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Text from '../components/Text';
import Header from '../components/Header';
import Button from '../components/Button';
import ExtStyle from '../utils/styles';
import { WHITE, YELLOW } from '../utils/constants';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 5,
    alignItems: 'center',
  },
  button: {
    width: width / 2,
  },
  buttonContainer: {
    marginTop: '4%',
    marginLeft: '4%',
    flex: 1,
  },
  imageCOntainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
});

export default () => (
  <View style={styles.container}>
    <Header headerName="INBOX" />
    <View style={ExtStyle.flex1}>
      <View style={styles.buttonContainer}>
        <Button text="New Message" color={YELLOW} textColor={WHITE} style={styles.button} />
      </View>
      <View style={styles.subContainer}>
        <View>
          <Image source={require('../../assets/docs.png')} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}> You have not received any </Text>
          <Text style={styles.text}> messages yet </Text>
        </View>
      </View>
    </View>
  </View>
);
