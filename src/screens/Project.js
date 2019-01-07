import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Text from '../components/Text';
import B from '../components/BoldText';
import Button from '../components/Button';
import { YELLOW, WHITE } from '../utils/constants';
import { isAndroid } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    // height: 50,
    flex: 1,
  },
  subContainer: {
    justifyContent: 'center',
    flex: 8,
    alignItems: 'center',
    // marginTop: isAndroid ? '25%' : '20%',
  },
  otherContainer: {
    alignItems: 'center',
    margin: 15,
  },
  floatingButton: {
    backgroundColor: YELLOW,
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 25,
    flex: 1,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Project extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          headerName="PROJECTS"
          sideIconStatus
          sideIconImage={require('../../assets/emptyBell.png')}
        />
        <View style={styles.subContainer}>
          <View>
            <Image source={require('../../assets/Illustration.png')} />
          </View>
          <View style={styles.otherContainer}>
            {/* <View style={styles.otherContainer}>
            <Text>
              {' '}
              Seems like you havent
              <B>proposed</B>
              {' '}
              or
              <B>been</B>{' '}
            </Text>
            <Text>
              {' '}
              <B> added </B>
              {' '}
              to any projects yet.You can propose a{' '}
            </Text>
            <Text> project using the plus sign or button below or </Text>
            <Text> wait to be added to one </Text>
          </View> */}

            <View style={styles.otherContainer}>
              <Text>
                Seems like you havent
                <B> created</B>
                <B> funded </B> or
              </Text>
              <Text>
                {' '}
                <B> added </B>
{' '}
saved any projects yet.You can propose a
{' '}
              </Text>
              <Text> project using the plus sign or button below or </Text>
              <Text> explore existing projects </Text>
            </View>
            <View>
              <Button
                text="Explore Project"
                color={WHITE}
                textColor="#201D41"
                style={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: '#B1BAD2',
                }}
                fn={() => this.props.navigation.navigate('ProjectListing')}
              />
              {/* <Button
              text="Propose Project"
              color={YELLOW}
              textColor={WHITE}
              fn={() => this.props.navigation.navigate('CreateProject')}
            /> */}
            </View>
          </View>

          <View style={styles.floatingButton}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CreateProject')}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image source={require('../../assets/plus.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
