import * as types from './actionTypes';

export const getNetwork = network  => ({
  type: types.GET_NETWORK,
  network,
});

export const updateNetwork = network => ({
  type: types.UPDATE_NETWORK,
  network,
});
