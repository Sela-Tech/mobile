import * as types from '../actions/actionTypes';

const projectReducer = (
  state = {
    projects: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case types.GET_PROJECTS:
      return { ...state, projects: action.projects };
    case types.PROJECT_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.HANDLE_PROJECT_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default projectReducer;
