import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootNavigator } from './src/Navigator';
import ErrorHandler from './src/components/ErrorHandler';
import Loading from './src/components/Loading';
import StatusBar from './src/components/StatusBar';
import NavigationService from './src/services/NavigationService';
import { store, persistor } from './store';
import { WHITE } from './src/utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading />}>
      <ErrorHandler>
        <View style={styles.container}>
          <StatusBar backgroundColor={WHITE} barStyle="light-content" />
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
