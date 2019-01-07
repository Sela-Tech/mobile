import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';

export const isLoading = bool => ({
  type: types.USERINFO_IS_LOADING,
  isLoading: bool,
});
export const error = errorMes => ({
  type: types.HANDLE_USERINFO_ERROR,
  error: errorMes,
});

export const addUserInfo = userInfo => ({
  type: types.ADD_USERINFO,
  userInfo,
});

export const saveUserInfo = data => dispatch => {
  dispatch(addUserInfo(data));
  AsyncStorage.setItem('userInfo', JSON.stringify(data))
    .then(() => {
      dispatch(isLoading(false));
    })
    .catch(err => {
      dispatch(isLoading(false));
      dispatch(error(err.message || 'ERROR'));
    });
};
