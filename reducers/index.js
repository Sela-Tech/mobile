import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import projects from './project';
import notifications from './notifications';
import credentials from './credentials';
import request from './evidence_request';
import wallet from './wallet';

const rootReducer = combineReducers({
  token,
  userInfo,
  projects,
  notifications,
  credentials,
  wallet,
  request,
});

export default rootReducer;
