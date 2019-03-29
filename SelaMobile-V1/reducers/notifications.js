import * as types from '../actions/actionTypes';

const notificationsReducer = (
  state = {
    notifications: {},
    loading: true,
    error: null,
  },
  action,
) => {
  switch (action.type) {
    case types.GET_ALL_USER_NOTIFICATION:
      return { ...state, notifications: action.notifications };
    case types.UPDATE_NOTIFICATION:
      // console.log('op', state.notifications);
      // console.log('llflgf', action.notificationID);
      const newObj = state.notifications.notifications.map(b => {
        if (b._id === action.notificationID) {
          b.action = 'NOT_REQUIRED';
          return b;
        }
        return b;
      });
      const nn = Object.assign({}, state, {
        notifications: state.notifications.newObj,
      });
      // return state;
      return { ...state, ...nn };
    case types.GET_NEW_NOTIFICATION:
      const newState = Object.assign({}, state, {
        notifications: action.notifications.notifications,
      });
      return { ...state, ...newState };
    case types.NOTIFICATION_IS_LOADING:
      return { ...state, loading: action.isLoading };
    case types.NOTIFICATION_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default notificationsReducer;
