import React, { Fragment } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import NavigationService from '../../services/NavigationService';
import Text from '../../components/Text';
import IndUpdates from '../../components/ExploreProject/Updates';
import Button from '../../components/Button';
import { WHITE } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 15,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 1,
    marginTop: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width / 2,
  },
});

const tasklisting = [
  {
    text:
      'Identify the 3 ponds to be treated. Move Biotechnology products to secured location at the site.',
    statusText: 'In Progress',
  },
  {
    text:
      'Identify VSE team and assignment to pond with laid out instructions for project execution',
    statusText: 'Completed',
  },
  {
    text:
      'Collection of 1st samples of water and soil and data after treatment. Send samples to the laboratory',
    statusText: 'Completed',
  },
];

const Updates = ({ project }) => (
  <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
    <Fragment>
      {tasklisting.map((c, index) => (
        <IndUpdates
key={index} text={c.text} statusText={c.statusText} />
      ))}
    </Fragment>
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginVertical: 10,
      }}
      onPress={() => console.log('i am hehrh')}
    >
      <View>
        <Text style={{ color: '#201D41' }}> View transactions</Text>
      </View>
      <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
        <Image source={require('../../../assets/forward-arrow.png')} />
      </View>
    </TouchableOpacity>
    <View style={{ paddingTop: 10, alignItems: 'center' }}>
      <Button
fn={() => NavigationService.navigate('Invest')} text="INVEST" />
    </View>
  </ScrollView>
);

export default Updates;
