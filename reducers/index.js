import { AsyncStorage } from 'react-native';
import { combineReducers } from 'redux';
import token from './token';
import userInfo from './userInfo';
import projects from './project';
import notifications from './notifications';
import credentials from './credentials';
import request from './evidence_request';
import wallet from './wallet';
import network from './network';
import * as types from '../actions/actionTypes';

const AppReducer = combineReducers({
  token,
  userInfo,
  projects,
  notifications,
  credentials,
  wallet,
  request,
  network,
});

// Clean state when user logs out
export const rootReducer = (state = {}, action) => {
  if (action.type === types.LOGOUT) {
    AsyncStorage.removeItem('persist:root');
    state = undefined;
  }

  return AppReducer(state, action);
};

export default rootReducer;
