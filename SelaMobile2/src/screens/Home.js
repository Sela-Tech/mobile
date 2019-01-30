import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import { DEFAULT_COLOUR, WHITE } from '../utils/constants';
import Text from '../components/Text';
import B from '../components/BoldText';
import Button from '../components/Button';
import IntroHeader from '../components/IntroHeader';

import NavigationService from '../services/NavigationService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DEFAULT_COLOUR,
  },
  boldText: {
    color: '#F2994A',
    fontSize: 25,
    fontWeight: '500',
  },
  buttomText: {
    color: '#FFFFFF',
    fontSize: 17,
  },
});

export default () => (
  <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <IntroHeader />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: Platform.OS === 'android' ? '10%' : '7%',
        }}
      >
        <Text style={styles.boldText}> Let’s Go </Text>
      </View>
    </View>
    <View style={{ flex: 2 }}>
      <View style={{ alignItems: 'center', marginTop: '3%' }}>
        <Text style={styles.buttomText}>
          Select
          <B fn={() => NavigationService.navigate('OnBoarding')}> Create account </B>
          {` if this is your first`}
        </Text>
        <Text style={styles.buttomText}>
          time or
          <B fn={() => NavigationService.navigate('Login')}> Log in </B>
          {`if you already have an`}
        </Text>
        <Text style={styles.buttomText}>
          account. You can also
          <B> Explore Projects</B>
        </Text>
        <Text style={styles.buttomText}> right away. </Text>
      </View>
      <View style={{ marginTop: '15%', alignItems: 'center' }}>
        <View>
          <Button
            text="Create account"
            color="#F2994A"
            medium
            textColor={WHITE}
            textSize={16}
            fn={() => NavigationService.navigate('OnBoarding')}
          />
        </View>
        <View style={{ marginTop: '5%' }}>
          <Button
            text="Log In"
            color="#FFFFFF"
            medium
            textColor="#F2994A"
            textSize={16}
            fn={() => NavigationService.navigate('Login')}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 40,
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View>
            <Text style={{ color: '#FFFFFF', fontSize: 20 }}>   Explore Projects </Text>
          </View>
          <View style={{ paddingLeft: 5, justifyContent: 'center' }}>
            <Image
              source={require('../../assets/img/forward.png')}
              style={{ height: 15, width: 15 }}
            />
          </View>
        </View>
      </View>
    </View>
  </View>
);
