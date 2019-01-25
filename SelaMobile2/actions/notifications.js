import * as API from '../src/utils/api';
import * as types from './actionTypes';

export const getAllUserNotifications = notifications => ({
    type: types.GET_ALL_USER_NOTIFICATION,
    notifications,
});

export const notificationsIsLoading = bool => ({
    type: types.NOTIFICATION_IS_LOADING,
    isLoading: bool,
});

export const notificationsIsLoadingError = error => ({
    type: types.GET_NOTIFICATION_ERROR,
    error,
});

export const updateNotifications = notifications => ({
    type: types.UPDATE_NOTIFICATIONS,
    notifications,
});


export const getUserNotifications = () => dispatch =>
    API.getUserNotifications()
        .then(resp => {
            dispatch(notificationsIsLoading(false));
            dispatch(getAllUserNotifications(resp.data));
        })
        .catch(err => {
            dispatch(notificationsIsLoading(false));
            dispatch(notificationsIsLoadingError(err.message || 'ERROR'));
        });

export const updateUserNotifications = () => dispatch =>
    API.updateNotifications()
        .then(resp => {
            dispatch(notificationsIsLoading(false));
            dispatch(updateNotifications(resp.data));
        })
        .catch(err => {
            dispatch(notificationsIsLoading(false));
            dispatch(notificationsIsLoadingError(err.message || 'ERROR'));
        });
