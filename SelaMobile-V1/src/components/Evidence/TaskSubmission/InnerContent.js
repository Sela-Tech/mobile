import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Text from '../../Text';
import { YELLOW } from '../../../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
});

const InnerContent = ({ toggleModal }) => (
  <View style={{ height: height / 12, justifyContent: 'center', backgroundColor: '#FAFAFA' }}>
    <View>
      <Text style={{ color: '#3D4851', fontSize: 14 }}>Purchase and install electrical poles </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
      <View style={{ justifyContent: 'center' }}>
        <AntDesign name="calendar" size={12} color="#696F74" />
      </View>
      <View>
        <Text style={{ color: '#696F74' }}> 19 Feb 19 </Text>
      </View>
      <View>
        <Text style={{ color: '#0A2C56' }}> No submissions yet. </Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => toggleModal()}>
          <Text style={{ color: YELLOW, fontWeight: 'bold' }}> View</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

export default InnerContent;
