import * as types from '../actions/actionTypes';

const networkReducer = (
  state = {
    status: false,
    value: {},
  },
  action,
) => {
  switch (action.type) {
    case types.GET_NETWORK:
      return state;
    // console.log('akksd', action);
    // return { ...state, status: action.network };
    case types.UPDATE_NETWORK:
      return state;
      console.log('22akksd', action);
    // return { ...state, status: action.network };
    default:
      return state;
  }
};

export default networkReducer;
