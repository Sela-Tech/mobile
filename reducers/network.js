import * as types from '../actions/actionTypes';

const networkReducer = (
  state = {
    status: false,
  },
  action,
) => {
  switch (action.type) {
    case types.GET_NETWORK:
      return { ...state, status: action.status };
    case types.UPDATE_NETWORK:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export default networkReducer;
