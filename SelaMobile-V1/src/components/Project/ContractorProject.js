import React from 'react';
import { ScrollView, FlatList, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getDummyDisplayPicture } from '../../utils/helpers';
import Box from '../ExploreProject/Box';
import SingularProject from './Project';
import ExtStyle from '../../utils/styles';
import NavigationService from '../../services/NavigationService';
import { YELLOW } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: YELLOW,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'flex-end',
    // flex: 1,
    position: 'absolute',
    bottom: 35,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const keyExtractor = (item, index) => index.toString();

const renderItem = item => (
  <View style={{ marginBottom: 10, marginTop: 10 }}>
    <Box
      fn={() => NavigationService.navigate('ExploreProject', item.item._id)}
      img={{ uri: item.item.avatar || item.item['project-avatar'] }}
      firstText={item.item.location.name}
      secondText={item.item.name}
      thirdText={item.item.status}
      title={item.item.description}
      cost={item.item.goal}
      tags={[]}
    />
  </View>
);

const ContractorProjects = ({ projects }) => (
  <ScrollView contentContainerstyle={styles.container}>
    <View style={styles.center}>
      <FlatList
        data={projects}
        renderItem={renderItem}
        style={{ flex: 1 }}
        keyExtractor={keyExtractor}
      />
    </View>
  </ScrollView>
);

export default ContractorProjects;
