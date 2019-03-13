import React, { Fragment, Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import NavigationService from '../../services/NavigationService';
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

const task2 = [
  {
    title: 'Roofing',
    text: 'Roofing of factory',
    statusText: 'In Progress',
  },
  {
    title: 'Insulation',
    text: 'Spray Foam, Blown-in Insulation, or Batt Insulation.',
    statusText: 'In Progress',
  },
  {
    title: 'Framing',
    text: 'Balloon Framing , Sheathing , Roof, Stairs.',
    statusText: 'In Progress',
  },
];

const tasklisting = [
  {
    title: 'Identification of ponds to be treated',
    text:
      'Identify the 3 ponds to be treated. Move Biotechnology products to secured location at the site.',
    statusText: 'In Progress',
  },
  {
    title: 'Identification of VSE teams',
    text:
      'Identify VSE team and assignment to pond with laid out instructions for project execution',
    statusText: 'Completed',
  },
  {
    title: 'Collection of samples of water and soil',
    text:
      'Collection of 1st samples of water and soil and data after treatment. Send samples to the laboratory',
    statusText: 'Completed',
  },
  {
    title: 'Site preparation',
    text: 'Site preparation and Collection of baseline data',
    statusText: 'In Progress',
  },
  {
    title: 'Biotechnology application 1',
    text: 'Application of first part of biotechnology',
    statusText: 'Completed',
  },
  {
    title: 'Biotechnology application 1',
    text: 'Application of second part of biotechnology',
    statusText: 'Completed',
  },
];

const filterTask = [tasklisting[Math.floor(Math.random() * tasklisting.length)], tasklisting[2]];

const Updates = ({ project, userRole }) => (
  <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
    <Fragment>
      {project.name !== 'Aba Factory construction'
        ? filterTask.map((c, index) => (
            <IndUpdates
            userRole={userRole}
            key={index}
            text={c.text}
            projectName={project.name}
            title={c.title}
            statusText={c.statusText}
          />
          ))
        : task2.map((c, index) => (
            <IndUpdates
            userRole={userRole}
            key={index}
            projectName={project.name}
            text={c.text}
            title={c.title}
            statusText={c.statusText}
          />
          ))}
    </Fragment>
    {/* <TouchableOpacity
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
    </TouchableOpacity> */}
    {/* <View style={{ paddingTop: 10, alignItems: 'center' }}>
      <Button
        fn={() => NavigationService.navigate('Invest', { name: project.name })}
        text="INVEST"
      />
    </View> */}
  </ScrollView>
);

export default Updates;
