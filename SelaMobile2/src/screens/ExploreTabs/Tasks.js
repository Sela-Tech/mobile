import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import Task from '../../components/ExploreProject/Tasks';
import Button from '../../components/Button';
import { WHITE } from '../../utils/constants';
import Text from '../../components/Text';

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
];

const Tasks = ({ project }) => {
  const { tasks } = project;
  if (tasks.length === 0) {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image source={require('../../../assets/docs.png')} />
          </View>
          <View style={{ alignItems: 'center', margin: 10 }}>
            <Text> There are no tasks yet for </Text>
            <Text> this project. Check back later. </Text>
          </View>

          <Button text="Add task" textColor={WHITE} />
        </View>
      </ScrollView>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
      {tasklisting.map((c, index) => (
        <Task
          key={index}
          text={c.text}
          title={c.title}
          statusText={c.statusText} />
      ))}
      <View style={{ paddingTop: 10, alignItems: 'center' }}>
        <Button text="Submit Updates" />
      </View>
    </ScrollView>
  );
};

export default Tasks;
