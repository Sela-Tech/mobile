import * as types from './actionTypes';

export const getNetwork = () => ({
  type: types.GET_PROJECTS,
});

export const updateNetwork = network => ({
  type: types.UPDATE_NETWORK,
  network,
});
