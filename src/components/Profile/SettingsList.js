import React from 'react';
import { TouchableOpacity, View, StyleSheet, AsyncStorage } from 'react-native';
import NavigationService from '../../services/NavigationService';
import Text from '../Text';
import B from '../BoldText';
import { store } from '../../../store';
import { LogOut } from '../../../actions/userInfo';

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});

const logOut = async () => {
  try {
    store.dispatch(LogOut());
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('persist:root');
    NavigationService.navigate('Login');
  } catch (err) {
    console.log(err.message);
  }
};

const SettingsList = ({ upText, downText }) => (
  <TouchableOpacity style={styles.container}>
    <View>
      <B
        size={14}
        color={upText === 'Logout' ? '#BC1717' : '#222829'}
        fn={upText === 'Logout' ? () => logOut() : () => console.log('test')}
      >
        {' '}
        {upText}
{' '}
      </B>
    </View>
    <View style={{ paddingTop: 5 }}>
      <Text> 
{' '}
{downText}
</Text>
    </View>
  </TouchableOpacity>
);

export default SettingsList;
