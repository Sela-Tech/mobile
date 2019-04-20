import * as types from '../actions/actionTypes';

const requestReducer = (
  state = {
    request: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case types.GET_EVIDENCE_REQUEST:
      return { ...state, request: action.request };
    case types.GET_EVIDENCE_REQUEST_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.GET_EVIDENCE_REQUEST_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default requestReducer;
