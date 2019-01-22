import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const middlewares = [
  // Add other middleware on this line...

  // thunk middleware can also accept an extra argument to be passed to each thunk action
  // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
  ReduxThunk,
  // logger, // use during development alone
];

if (__DEV__) {
  middlewares.push(createLogger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);
