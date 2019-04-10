import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    height: height / 4,
    backgroundColor: '#0A2C56',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePosition: {
    position: 'absolute',
    top: 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '500',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  backButton: {
    marginTop: '7%',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  backButtonText: {
    color: WHITE,
    fontSize: 15,
  },
});

export default class Header extends Component {
  state = {
    toggle: true,
  };

  toggle = () => this.setState(prevState => ({ toggle: !prevState.toggle }));

  render() {
    const { title, balance, navigation, nativeBalance } = this.props;
    const { toggle } = this.state;
    return (
      <View style={styles.header}>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <Text style={styles.title}> {title} </Text>
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: 'row',
            width: width / 1.7,
            borderWidth: 1,
            borderColor: WHITE,
            borderRadius: 7,
            height: 25,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              // borderLeftRadius: 7,
              alignItems: 'center',
              // borderColor: WHITE,
              justifyContent: 'center',
              flex: 1,
              // height: 30,
              // borderWidth: 7,
              backgroundColor: toggle ? WHITE : null,
            }}
          >
            <TouchableOpacity onPress={() => this.toggle()}>
              <Text style={{ fontSize: 10, color: toggle ? '#0A2C56' : WHITE }}>
                {' '}
                Project tokens (PST){' '}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              backgroundColor: !toggle ? WHITE : null,
            }}
            onPress={() => this.toggle()}
          >
            <Text style={{ fontSize: 10, color: !toggle ? '#0A2C56' : WHITE }}> Lumens (XLM)</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 5, flex: 3 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ color: '#BFDBFE', fontWeight: '300' }}> Balance </Text>
            </View>
            <View
              style={{ paddingTop: 10, flex: 3, justifyContent: 'center', flexDirection: 'row' }}
            >
              <View style={{ paddingTop: 10 }}>
                <View
                  style={{
                    height: 15,
                    width: 20,
                    backgroundColor: toggle ? '#156EDC' : '#369C05',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 8, fontWeight: '300' }}> {toggle ? 'PST ' : 'XLM'}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.balance}>
                  {' '}
                  {toggle ? parseFloat(balance).toFixed(3) : nativeBalance}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 40,
              top: 20,
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity onPress={() => this.toggle()}>
              <Image source={require('../../../assets/toggle.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imagePosition}>
          <TouchableOpacity
            transparent
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <View>
              <Image source={require('../../../assets/white-back.png')} />
            </View>
            <View>
              <Text style={styles.backButtonText}> Back </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
