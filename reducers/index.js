import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import token from './token';
import userInfo from './userInfo';
import projects from './project';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  token,
  userInfo,
  projects,
});

// export default persistReducer(rootReducer);
export default persistReducer(rootPersistConfig, rootReducer);
