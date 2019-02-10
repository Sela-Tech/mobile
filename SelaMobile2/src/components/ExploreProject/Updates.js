import React from 'react';
import { View, FlatList } from 'react-native';
import Text from '../Text';
import Tag from '../Tag';
import B from '../BoldText';
import EvalSubmission from './EvalSubmission';
import { projectStatusTextColor } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';

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

const Updates = ({ title, statusText, text }) => (
  <View style={{ flex: 1, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 15, flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Text style={{ color: '#201D41', fontWeight: '400' }}>Status </Text>
      </View>
      <View style={{ flex: 1, marginRight: 5 }}>
        <Tag
          textColor={WHITE}
          text={statusText}
          viewColor={projectStatusTextColor(statusText)}
        />
      </View>
    </View>
    <View style={{ flex: 4, paddingTop: 3 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '500' }}>Task Name:  </Text>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '300' }}>{title} </Text>
        </View>
      </View>
      <View style={{ marginTop: '2%' }}>
        <Text style={{ color: '#222829' }}>{text}</Text>
      </View>
    </View>
    <View style={{ marginTop: 10 }}>
      <View>
        <B color="#201D41"> Evalaution Submissions</B>
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
