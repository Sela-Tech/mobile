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
};
