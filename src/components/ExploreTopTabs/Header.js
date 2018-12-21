import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 12,
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 10,
  },
});

const Header = ({
  projectStatusText,
  projectNameText,
  projectLocationText,
  projectTitleText,
  budgetAmount,
  numberOfStakeholders,
  raisedAmount,
  tags,
}) => (
  <View style={styles.container}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flexDirection: 'row', flex: 5 }}>
        <View>
          <Text style={styles.smallText}> 
{' '}
{projectLocationText}
</Text>
        </View>
        <View style={{ marginTop: -5 }}>
          <Entypo name="dot-single" size={18} color="#696F74" />
        </View>
        <View>
          <Text style={styles.smallText}> 
{' '}
{projectNameText}
{' '}
 </Text>
        </View>
        <View style={{ marginTop: -5 }}>
          <Entypo name="dot-single" size={18} color="#696F74" />
        </View>
        <View>
          <Text style={[styles.smallText, { color: '#369C05' }]}>{projectStatusText}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Image style={{ alignSelf: 'flex-end' }} source={require('../../../assets/badge.png')} />
      </View>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ color: '#201D41', fontSize: 15 }}> 
{' '}
{projectTitleText}
</Text>
    </View>
    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
      <View>
        <Text> Budget </Text>
        <Text style={{ color: '#201D41' }}> {budgetAmount} </Text>
      </View>
      <View>
        <Text> Raised </Text>
        <Text style={{ color: '#201D41' }}> {raisedAmount} </Text>
      </View>
      <View>
        <Text> StakeHolders</Text>
        <Text style={{ color: '#201D41' }}> {numberOfStakeholders} </Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', flex: 2 }}>
      <View
        style={{
          backgroundColor: '#fda0a0',
          justifyContent: 'center',
          borderRadius: 2,
          flex: 1,
          height: 30,
        }}
      >
        <Text style={{ color: '#eb5757', fontWeight: '500' }}> {tags[0]}</Text>
      </View>
      <View
        style={{
          height: 30,
          marginLeft: 10,
          flex: 1,
          backgroundColor: '#d3f8ec',
          justifyContent: 'center',
          borderRadius: 2,
        }}
      >
        <Text style={{ color: '#1ECD97', fontWeight: '500' }}> {tags[1]}</Text>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  </View>
);

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
