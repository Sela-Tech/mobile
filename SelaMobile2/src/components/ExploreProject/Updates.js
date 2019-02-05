import React from 'react';
import { View, FlatList } from 'react-native';
import Text from '../Text';
import Tag from '../Tag';
import B from '../BoldText';
import EvalSubmission from './EvalSubmission';

const keyExtractor = item => item.id.toString();

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

const Updates = ({ statusText, text }) => (
  <View style={{ flex: 1, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 15, flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Text style={{ color: '#696F74', fontWeight: '400' }}>Deadline </Text>
      </View>
      <View style={{ flex: 1, marginRight: 5 }}>
        <Tag
          textColor={statusText === 'In Progress' ? '#369C05' : '#E06811'}
          viewColor={statusText === 'In Progress' ? '#d2fdbf' : '#f7bc92'}
          text={statusText}
        />
      </View>
    </View>
    <View style={{ flex: 4 }}>
      <View>
        <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '400' }}>Name of Task </Text>
      </View>
      <View style={{ marginTop: '2%' }}>
        <Text style={{ color: '#222829' }}>{text}</Text>
      </View>
    </View>
    <View style={{ marginTop: 10 }}>
      <View>
        <B> Evalaution Submissions</B>
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
  </View>
);

export default Updates;
