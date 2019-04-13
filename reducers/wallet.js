import * as types from '../actions/actionTypes';

const walletReducer = (
  state = {
    transactions: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case types.GET_WALLET_TRANSACTION:
      return { ...state, transactions: action.transactions };
    case types.GET_WALLET_TRANSACTION_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.GET_WALLET_TRANSACTION_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default walletReducer;
