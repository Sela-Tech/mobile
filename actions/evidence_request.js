import * as API from '../src/utils/api';
import * as types from './actionTypes';

export const getRequest = request => ({
  type: types.GET_EVIDENCE_REQUEST,
  request,
});

export const requestIsLoading = bool => ({
  type: types.GET_EVIDENCE_REQUEST_IS_LOADING,
  isLoading: bool,
});

export const updateRequest = id => ({
  type: types.UPDATE_REQUEST,
  id,
});

export const requestIsLoadingError = error => ({
  type: types.GET_EVIDENCE_REQUEST_ERROR,
  error,
});

export const getUserRequest = projectId => dispatch =>
  API.retrieveEvidenceRequest(projectId)
    .then(resp => {
      dispatch(requestIsLoading(false));
      dispatch(getRequest(resp.data.evidenceRequests));
    })
    .catch(err => {
      dispatch(requestIsLoading(false));
      dispatch(requestIsLoadingError(err.message || 'ERROR'));
    });
