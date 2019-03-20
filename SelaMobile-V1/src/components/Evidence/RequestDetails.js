import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import Text from '../Text';
import Tag from '../Tag';
import { tagsColor, titleCase } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';
import ExtStyles from '../../utils/styles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 6,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#F5F5F8',
    flex: 1,
    justifyContent: 'space-between',

    marginVertical: 5,
  },
  middleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageStyle: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
    height: width / 9,
    width: width / 9,
    borderRadius: width / 5,
  },
  tagStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  mlMinus15: {
    marginLeft: -15,
  },
  imageContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
    paddingTop: 5,
    justifyContent: 'center',
  },
  titleText: {
    color: '#0A2C56',
    fontSize: 18,
  },
  dataTypeText: {
    fontSize: 14,
    color: '#3D4851',
  },
  dueDateText: {
    fontSize: 14,
    color: '#3D4851',
  },
  otherContainer: {
    flex: 2,
    flexDirection: 'row',
  },
});

const RequestDetails = ({ title, dataType, dueDate, stakeHolders, status }) => {
  const stakeHoldersPics = stakeHolders.map(c => c.user.profilePhoto);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.otherContainer }>
          <View style={ExtStyles.jc}>
            <Text style={styles.dataTypeText}> {titleCase(dataType)} </Text>
          </View>
          <View style={ExtStyles.jc}>
            <Entypo name="dot-single" size={25} color="#696F74" />
          </View>
          <View style={ExtStyles.jc}>
            <Text style={styles.dueDateText}> {moment(dueDate).format('LL')}</Text>
          </View>
        </View>
        <View style={styles.tagStyle}>
          <Tag text={titleCase(status)} viewColor={tagsColor(status)} textColor={WHITE} />
        </View>
      </View>

      <View style={styles.imageContainer}>
        {stakeHoldersPics.map((c, i) => (
          <View key={i} style={i === 0 ? null : styles.mlMinus15}>
            <Image source={{ uri: c }} style={styles.imageStyle} />
          </View>
        ))}
      </View>
    </View>
  );
};
export default RequestDetails;
