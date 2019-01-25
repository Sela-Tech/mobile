import React, { Component } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import B from '../components/BoldText';
import Header from '../components/Header';
import Project from '../components/ExploreProject/Project';
import UserId from '../components/Profile/UserId';
import UserInfo from '../components/Profile/UserInfo';
import Tag from '../components/Tag';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    marginTop: '5%',
  },
});

const images = [
  {
    source: require('../../assets/oilspill.png'),
    id: 1,
    test: 'Idejo Classroom Blocks Construction',
  },
  {
    source: require('../../assets/road.png'),
    id: 2,
    test: 'Idejo Classroom Blocks Construction',
  },
  {
    source: require('../../assets/borehole.png'),
    id: 3,
    test: 'Idejo Classroom Blocks Construction',
  },
  {
    source: require('../../assets/road.png'),
    id: 4,
    test: 'Idejo Classroom Blocks Construction',
  },
  {
    source: require('../../assets/borehole.png'),
    id: 5,
    test: 'Idejo Classroom Blocks Construction',
  },
];

const keyExtractor = item => item.id;

const renderItem = item => <Project imgSource={item.item.source} test={item.item.test} />;

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Header headerName="PROFILE" />
        <View style={styles.subContainer}>
          <UserId />
          <UserInfo />
          <View style={{ marginVertical: 10 }}>
            <View style={{ marginVertical: 15, marginLeft: 10 }}>
              <B color="#201D41"> Other projects with Ade </B>
            </View>
            <FlatList
              style={{ paddingTop: 10 }}
              data={images}
              keyExtractor={keyExtractor}
              horizontal
              renderItem={renderItem}
            />
          </View>
          <View>
            <View style={{ marginVertical: 15, marginLeft: 10 }}>
              <B color="#201D41"> Interests </B>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Tag viewColor="#1ECD97" text="Education" />

              <Tag viewColor="#1ECD97" text="Education" />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
