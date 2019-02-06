import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import projects from './project';
import notifications from './notifications';
import credentials from './credentials';

const rootReducer = combineReducers({
  token,
  userInfo,
  projects,
  notifications,
  credentials,
});

export default rootReducer;
