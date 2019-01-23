import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import io from 'socket.io-client';
import { RootNavigator } from './src/Navigator';
import ErrorHandler from './src/components/ErrorHandler';
import Loading from './src/components/Loading';
import NavigationService from './src/services/NavigationService';
import { store, persistor } from './store';
import { WHITE, BASE_URL, SOCKET_URL } from './src/utils/constants';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});


export default class App extends React.Component {
  constructor(props) {
    super(props);
    // connect to socketio 
    this.socket = io(SOCKET_URL, {
      // transports: ['websocket'],
      // 'reconnection': true,
      // 'reconnectionDelay': 500,
      // 'reconnectionAttempts': Infinity,
      transports: ['websocket'],
    });

  }
  componentDidMount() {

    console.log('jjjdjdjdj')
    const socket = this.socket;
    // if (!socket) return;
    socket.on('connect', () => {
      // console.log('', data)
      // socket.on('connected',)
    });
    socket.on('ping', data => {
      console.log('status', data)
      // this.setState(data);
    });

    socket.on('connected', (data) => {
      console.log('at home', data)
    })
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <ErrorHandler>
            <View style={styles.container}>
              <RootNavigator
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />
            </View>
          </ErrorHandler>
        </PersistGate>
      </Provider>
    )
  }
}


// export default () => (
//   <Provider store={store}>
//     <PersistGate persistor={persistor} loading={<Loading />}>
//       <ErrorHandler>
//         <View style={styles.container}>
//           <RootNavigator
//             ref={navigatorRef => {
//               NavigationService.setTopLevelNavigator(navigatorRef);
//             }}
//           />
//         </View>
//       </ErrorHandler>
//     </PersistGate>
//   </Provider>
// );
// const socket = io(BASE_URL, {
//   transports: ['websocket'],
// });

// socket.on('connected', () => {
//   console.log('socket connected');
// });
