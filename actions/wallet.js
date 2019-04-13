import * as API from '../src/utils/api';
import * as types from './actionTypes';

export const isLoading = bool => ({
  type: types.GET_WALLET_TRANSACTION_IS_LOADING,
  isLoading: bool,
});
export const error = errorMes => ({
  type: types.GET_WALLET_TRANSACTION_ERROR,
  error: errorMes,
});

export const getTransactions = transactions => ({
  type: types.GET_WALLET_TRANSACTION,
  transactions,
});

export const getUserTransactions = () => dispatch =>
  API.getUserBalance()
    .then(resp => {
      dispatch(isLoading(false));
      dispatch(getTransactions(resp.data));
    })
    .catch(err => {
      dispatch(isLoading(false));
      dispatch(getTransactions(err.message || 'ERROR'));
    });
