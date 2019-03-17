import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Text from '../Text';
import Tag from '../Tag';
import { tagsColor } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';

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
});

const RequestDetails = ({ title }) => (
  <View style={styles.container}>
    <View style={{ flex: 1, paddingTop: 5, justifyContent: 'center' }}>
      <Text style={{ color: '#0A2C56', fontSize: 18 }}>{title}</Text>
    </View>
    <View style={styles.middleContainer}>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, color: '#3D4851' }}> Image </Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Entypo name="dot-single" size={25} color="#696F74" />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, color: '#3D4851' }}> 01 Jan 201</Text>
        </View>
      </View>
      <View style={styles.tagStyle}>
        <Tag text="pending" viewColor={tagsColor('pending')} textColor={WHITE} />
      </View>
    </View>

    <View style={{ flex: 2, flexDirection: 'row' }}>
      <View style={{}}>
        <Image style={styles.imageStyle} source={require('../../../assets/woman1.png')} />
      </View>
      <View style={{ marginLeft: -15 }}>
        <Image style={styles.imageStyle} source={require('../../../assets/img/woman.png')} />
      </View>
      <View style={{ marginLeft: -15 }}>
        <Image style={styles.imageStyle} source={require('../../../assets/person.png')} />
      </View>
    </View>
  </View>
);
export default RequestDetails;
