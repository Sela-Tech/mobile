import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { YELLOW } from '../../utils/constants';
import NavigationService from '../../services/NavigationService';

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  innerContainer: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  deadlineText: {
    color: '#3D4851',
    fontSize: 10,
  },
  titleText: {
    color: '#222829',
  },
  boxContainer: {
    flex: 1,
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fdefe2',
    justifyContent: 'center',
    borderRadius: 10,
  },
  updateText: {
    color: '#F2994A',
    fontSize: 12,
    fontWeight: '400',
  },
});

const Content = ({ deadline, title, toggleModal }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.deadlineText}>{deadline}</Text>
    </View>
    <View style={styles.innerContainer}>
      <View style={{ flex: 3 }}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 2,
          }}
          onPress={() => toggleModal()}
        >
          <View style={{ justifyContent: 'center' }}>
            <Image
              resizeMode="contain"
              tintColor={YELLOW}
              style={{
                height: 15,
              }}
              source={require('../../../assets/plus.png')}
            />
          </View>
          <View>
            <Text style={styles.updateText}>Add Update</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
    <View>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => NavigationService.navigate('ContractorUpdates')}
      >
        <View>
          <Text style={styles.titleText}>View Updates </Text>
        </View>
        <View style={{ justifyContent: 'center', marginLeft: 5 }}>
          <Image source={require('../../../assets/forward-arrow.png')} />
        </View>
      </TouchableOpacity>
    </View>
  </View>
);
export default Content;
