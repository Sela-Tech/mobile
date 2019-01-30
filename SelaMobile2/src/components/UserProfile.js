import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import NavigationService from '../services/NavigationService';
import Text from './Text';
import B from './BoldText';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F5F5F8',
    width: width / 1.5,
    marginVertical: 12,
  },
});

const UserProfile = ({ imgSource, userName, companyName, userId }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => NavigationService.navigate('UserProfile', userId)}
  >
    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
      <View style={{ paddingLeft: 10 }}>
        <Image
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
          // resizeMode="contain"
          source={imgSource}
        />
      </View>
      <View style={{ height: 80, marginLeft: 20, justifyContent: 'center' }}>
        <View>
          <B>
            {userName}
            {' '}
          </B>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Image source={require('../../assets/star.png')} />
          <Text> 80 </Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text>{companyName}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default UserProfile;
