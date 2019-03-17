import React, { Component } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
// import Instabug from 'instabug-reactnative';
import { PersistGate } from 'redux-persist/integration/react';
import { RootNavigator } from './src/Navigator';
import ErrorHandler from './src/components/ErrorHandler';
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
    // Instabug.startWithToken('a1713df89289cd1a3490a23f2a1c8208', [Instabug.invocationEvent.shake]);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <ErrorHandler>
            <View style={styles.container}>
              <StatusBar barStyle="light-content" />
              <RootNavigator
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </View>
          </ErrorHandler>
        </PersistGate>
      </Provider>
    );
  }
}
