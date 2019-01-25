/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  YellowBox,
} from 'react-native';
import io from 'socket.io-client';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
// https://sela-develop.herokuapp.com/';
const socket = io('https://sela-develop.herokuapp.com/', {
  secure: true,
  transports: ['websocket']
});

export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    // console.ignoredYellowBox = ['Remote debugger'];
    // YellowBox.ignoreWarnings([
    //   'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
    // ]);

  }

  //for web socket
  // componentDidMount = () => {
  //   // var ws = new WebSocket('ws://a17b0dc6.ngrok.io/');

  //   var ws = new WebSocket('wss://test-socket1.herokuapp.com/');
  //   console.log('testing')
  //   ws.onopen = (data) => {
  //     // connection opened
  //     ws.send('something', data); // send a message
  //   }

  //   ws.addEventListener('connect', function (event) {
  //     ws.send('Hello Server!');
  //   });
  //   ws.addEventListener('message', (data) => {
  //     console.log('at message', data.data)
  //   })

  //   ws.addEventListener('connected', (data) => {
  //     console.log('at home', data.data)
  //   })

  // };
  componentDidMount() {

    console.log('i--i')

    socket.on('connect', (data) => {
      console.log('hhdhdh', data)
      // socket.on('connected',)
    });

    socket.on('message', (data) => {
      console.log('hhdhdh', data)
      // socket.on('connected',)
    });
    socket.on('connection', (data) => {
      console.log('hhdhdh', data)
      // socket.on('connected',)
    });

    socket.on('connected', (data) => {
      console.log('at home', data)
    })

    socket.on('ping', data => {
      console.log('status', data)
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

