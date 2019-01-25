import { Platform } from 'react-native';
import moment from 'moment';

export const isAndroid = Platform.OS === 'android';

/**
 * Validate param
 * @param {*} param 
 */
export const validateparam = param => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(param).toLowerCase());
};

export const formattedDate = currDate => {
    const date = moment(currDate).fromNow();
    return date;
};
