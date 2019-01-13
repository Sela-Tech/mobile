import { AsyncStorage } from 'react-native';
import * as API from '../src/utils/api';
import { saveUserInfo } from './userInfo';
import * as types from './actionTypes';
import { userInfo } from 'os';

export const getToken = token => ({
  type: types.GET_TOKEN,
  token,
});

export const tokenIsLoading = bool => ({
  type: types.TOKEN_IS_LOADING,
  isLoading: bool,
});

export const tokenLoadingError = error => ({
  type: types.HANDLE_TOKEN_ERROR,
  error,
});

export const saveToken = token => ({
  type: types.SAVE_TOKEN,
  token,
});

export const removeToken = () => ({
  type: types.REMOVE_TOKEN,
});

export const login = data => dispatch =>
  API.login(data)
    .then(resp => {
      dispatch(saveUserToken(resp.data));
      if (resp.status === 200) {
        dispatch(tokenIsLoading(false));
        dispatch(saveUserInfo(resp.data));
        return resp.data.success;
      }
      if (resp.status === 401) {
        dispatch(tokenIsLoading(false));
        return resp.data.message;
      }
      return false;
    })
    .catch(err => {
      dispatch(tokenIsLoading(false));
      dispatch(tokenLoadingError(err.message || 'ERROR'));
    });

export const saveUserToken = userInfo => dispatch => {

  this.userToken = userInfo.token;
  const userInfoToSave = JSON.stringify(userInfo);
  AsyncStorage.setItem('token', userInfoToSave)
    .then(() => {
      dispatch(tokenIsLoading(false));
    })
    .catch(err => {
      dispatch(tokenIsLoading(false));
      dispatch(tokenLoadingError(err.message || 'ERROR'));
    });
};

export const getUserToken = () => dispatch =>
  AsyncStorage.getItem('token')
    .then(data => {
      dispatch(tokenIsLoading(false));
      dispatch(getToken(data));
    })
    .catch(err => {
      dispatch(tokenIsLoading(false));
      dispatch(tokenLoadingError(err.message || 'ERROR'));
    });

export const removeUserToken = () => dispatch =>
  AsyncStorage.removeItem('token')
    .then(data => {
      dispatch(tokenIsLoading(false));
      dispatch(removeToken(data));
    })
    .catch(err => {
      dispatch(tokenIsLoading(false));
      dispatch(tokenLoadingError(err.message || 'ERROR'));
    });
