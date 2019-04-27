import React from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import Text from '../Text';
import Submission from './Submission';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

const images = [
  {
    source: require('../../../assets/img/cleanup/cleanup_4.jpg'),
    id: 22,
  },
  {
    source: require('../../../assets/img/cleanup/cleanup_22.jpg'),
    id: 31,
  },
  {
    source: require('../../../assets/img/cleanup/factory_1.jpeg'),
    id: 2,
  },
  {
    source: require('../../../assets/img/cleanup/factory_2.jpg'),
    id: 3,
  },
];

const keyExtractor = item => item.id.toString();

const renderItem = item => <Submission imgSource={item.item.source} markedStatus />;

const Report = ({ status }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row', marginVertical: 5 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#222829' }}>Report 3 </Text>
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text style={{ color: '#696F74' }}> 24 Jan 2019; 04:56 pm</Text>
      </View>
    </View>
    <View style={{ marginVertical: 2 }}>
      <Text style={{ color: '#1ECD97' }}>{status}</Text>
    </View>
    <View>
      <Text style={{ color: '#3D4851' }}>
        Do you have any idea how long it takes those cups to decompose. Checkmate... Hey, take a
        look at the earthlings. Goodbye! This thing comes fully loaded.
      </Text>
    </View>
    <FlatList
      style={{ paddingTop: 10 }}
      data={images}
      showsHorizontalScrollIndicator={false}
      keyExtractor={keyExtractor}
      horizontal
      renderItem={renderItem}
    />
  </View>
);
export default Report;
