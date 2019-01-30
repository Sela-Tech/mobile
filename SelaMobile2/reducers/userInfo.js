// import { REHYDRATE } from 'redux-persist';
import * as types from '../actions/actionTypes';

const userInfoReducer = (
  state = {
    user: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload && action.payload.token || {};
    case types.ADD_USERINFO:
      return { ...state, user: action.userInfo };
    case types.USERINFO_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.HANDLE_USERINFO_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default userInfoReducer;
