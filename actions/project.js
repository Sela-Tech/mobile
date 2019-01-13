import * as API from '../src/utils/api';
import * as types from './actionTypes';

export const getProjects = projects => ({
  type: types.GET_PROJECTS,
  projects,
});

export const projectIsLoading = bool => ({
  type: types.PROJECT_IS_LOADING,
  isLoading: bool,
});

export const projectIsLoadingError = error => ({
  type: types.HANDLE_PROJECT_ERROR,
  error,
});

export const getUserProject = () => dispatch =>
  API.getAllProjects()
    .then(resp => {
      dispatch(projectIsLoading(false));
      dispatch(getProjects(resp.data));
    })
    .catch(err => {
      dispatch(projectIsLoading(false));
      dispatch(projectIsLoadingError(err.message || 'ERROR'));
    });
