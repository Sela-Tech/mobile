import React from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import Text from '../Text';
import Tag from '../Tag';
import B from '../BoldText';
import EvalSubmission from './EvalSubmission';

const keyExtractor = item => item.id;

const renderItem = item => <EvalSubmission imgSource={item.item.source} markedStatus />;

const images = [
  {
    source: require('../../../assets/oilspill.png'),
    id: 1,
  },
  {
    source: require('../../../assets/road.png'),
    id: 2,
  },
  {
    source: require('../../../assets/borehole.png'),
    id: 3,
  },
  {
    source: require('../../../assets/road.png'),
    id: 4,
  },
  {
    source: require('../../../assets/borehole.png'),
    id: 5,
  },
];

const Updates = ({ statusText }) => (
  <View style={{ flex: 1, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 15, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#696F74', fontWeight: '400' }}>Deadline </Text>
      </View>
      <Tag
        textColor={statusText === 'In Progress' ? '#369C05' : '#E06811'}
        viewColor={statusText === 'In Progress' ? '#d2fdbf' : '#f7bc92'}
        text={statusText}
      />
    </View>
    <View style={{ flex: 4 }}>
      <View>
        <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '400' }}>Name of Task </Text>
      </View>
      <View style={{ marginTop: '2%' }}>
        <Text style={{ color: '#222829' }}>
          This is where the brief description of the task goes. This is where the brief description
          of the task goes. This is where the brief description of the task goes. This is where the
          brief description of the task goes. This is where the brief description of the task goes.
        </Text>
      </View>
    </View>
    <View style={{ marginTop: 10 }}>
      <View>
        <B> Evalaution Submissions</B>
      </View>
      <FlatList
        style={{ paddingTop: 10 }}
        data={images}
        keyExtractor={keyExtractor}
        horizontal
        renderItem={renderItem}
      />
    </View>
  </View>
);

export default Updates;