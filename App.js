import React, { Component } from 'react';
import { StyleSheet, View, YellowBox, StatusBar, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
// import Instabug from 'instabug-reactnative';
import { PersistGate } from 'redux-persist/integration/react';
import { RootNavigator } from './src/Navigator';
import ErrorHandler from './src/components/ErrorHandler';
import OfflineNotice from './src/components/OfflineNotice';
import Loading from './src/components/Loading';
import NavigationService from './src/services/NavigationService';
import { store, persistor } from './store';
import { WHITE } from './src/utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default class App extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Setting a timer',
      'Warning',
      'Remote',
      'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    ]);
    // Instabug.startWithToken('a1713df89289cd1c8208', [Instabug.invocationEvent.shake]);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <ErrorHandler>
            <ImageBackground
              source={require('./assets/splash_screen.png')}
              style={styles.container}
            >
              <StatusBar barStyle="light-content" />
              <RootNavigator
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
              <OfflineNotice />
            </ImageBackground>
          </ErrorHandler>
        </PersistGate>
      </Provider>
    );
  }
}
