import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '../components/Text';
import B from '../components/BoldText';
import Button from '../components/Button';
import { YELLOW, WHITE } from '../utils/constants';
import { isAndroid } from '../utils/helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: isAndroid ? '25%' : '15%',
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
  // static navigationOptions = {
  //   title: 'Project',
  // };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={require('../../assets/Illustration.png')} />
        </View>
        <View style={styles.otherContainer}>
          <View style={styles.otherContainer}>
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
          </View>
          <View>
            <Button
              text="Propose Project"
              color={YELLOW}
              textColor={WHITE}
              fn={() => this.props.navigation.navigate('CreateProject')}
            />
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
    );
  }
}
