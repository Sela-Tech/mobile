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

export const formattedDate = currDate => moment(currDate).fromNow(true);

export const sortNotificationsByDate = notifications =>
  notifications.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

export const isPhoneNum = value => /^(\+?0?86\-?)?1[3-8][0-9]{9}$/.test(String(value));

export const isEmail = value => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);

/** Capitalize the first letter of  each word in a string
 * @param str String
 * @return String
 */
export const titleCase = str => {
  const string = str.toLowerCase()
    .split(' ')
    .map(word => (word.charAt(0).toUpperCase() + word.slice(1)));

  return string.join(' ');
};

export const firstLetterCapital = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
