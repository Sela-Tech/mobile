import { REHYDRATE } from 'redux-persist';
import * as types from '../actions/actionTypes';

const tokenReducer = (
  state = {
    token: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    // case REHYDRATE:
    //   return action.payload && action.payload.token || {};
    case types.GET_TOKEN:
      return { ...state, token: action.token };
    case types.TOKEN_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.HANDLE_TOKEN_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default tokenReducer;
