import { Platform, Dimensions } from 'react-native';
import moment from 'moment';
import { WHITE } from './constants';
import { uploadToAWS } from './api';

const { height } = Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';

export const extraSmallScreen = height < 568;
export const smallScreen = height < 667;

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
  const string = str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));

  return string.join(' ');
};

export const firstLetterCapital = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const projectStatusTextColor = status => {
  switch (status && status.toUpperCase()) {
    case 'DORMANT':
      return 'red';
    case 'ON GOING':
      return '#E06811';
    case 'PENDING':
      return '#E06811';
    case 'IN PROGRESS':
      return '#E06811';
    case 'DELAYED':
      return 'red';
    case 'COMPLETED':
      return '#369C05';
    case 'PROPOSED':
      return '#0B089D';
    case 'IN REVIEW':
      return WHITE;
    default:
      return '#369C05';
  }
};

export const tags = tags => {
  switch (tags) {
    case 'Education':
      return 'red';
    case 'Economic Growth':
      return '#E06811';
    case 'Water & Sanitation':
      return '#369C05';
    case 'Infrastructure':
      return '#0B089D';
    default:
      return '#369C05';
  }
};


export const uploadImageToAWS = async (avatarSource, cred) => {
  try {
    const file = {
      uri: avatarSource,
      name: 'image.png',
      type: 'image/png',
    };
    const resp = await uploadToAWS(file, null, cred);
    if (resp === false) {
      return 'https://placeimg.com/200/200/people';
    }
    else {
      return resp.postResponse.location;
    }
  }
  catch (err) {
    return 'https://placeimg.com/200/200/people';
  }
};
