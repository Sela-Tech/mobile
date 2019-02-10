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


export const getDummyDisplayPicture = name => {
  switch (name) {
    case 'Bodo clean up':
      return require('../../assets/img/cleanup/grass.jpg');
    case 'Ogoni land':
      return require('../../assets/img/cleanup/water.jpg');
    default:
      return require('../../assets/img/cleanup/cleanup_2.jpg');
  }
};

export const tagsColor = tagsText => {
  switch (tagsText && tagsText.toUpperCase()) {
    case 'EDUCATION':
      return 'red';
    case 'ECONOMIC GROWTH':
      return '#E06811';
    case 'WATER & SANITATION':
      return '#369C05';
    case 'INFRASTRUCTURE':
      return '#0B089D';
    case 'NO POVERTY':
      return '#E3253C';
    case 'ZERO HUNGER':
      return '#DEA73A';
    case 'GOOD HEALTH AND WELL BEING':
      return '#4C9F45';
    case 'QUALITY EDUCATION':
      return '#C5202E';
    case 'GENDER EQUALITY':
      return '#F0412B';
    case 'CLEAN WATER AND SANITATION':
      return '#29BEE2';
    case 'AFFORDABLE AND CLEAN ENERGY':
      return '#FAC315';
    case 'DECENT WORK AND ECONOMIC GROWTH':
      return '#A21C44';
    case 'INDUSTRY,INNOVATION AND INFRASTRUCTURE':
      return '#F26A2C';
    case 'REDUCED INEQULAITIES':
      return '#DD1768';
    case 'SUSTAINABLE CITIES AND COMMUNITIES':
      return '#F99D27';
    case 'RESPONSIBLE CONSUMPTION AND PRODUCTION':
      return '#F99D27';
    case 'CLIMATE ACTION':
      return '#417F45';
    case 'LIFE BELOW WATER':
      return '#1C97D3';
    case 'LIFE ON LAND':
      return '#5DBB47';
    case 'PEACE,JUSTICE AND STRONG INSTITUTIONS':
      return '#06699E';
    case 'PARTERNSHIP FOR THE GOALS':
      return '#18486B';
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
