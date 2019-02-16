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
    source: require('../../../assets/img/cleanup/cleanup_3.jpg'),
    id: 1,
  },
  {
    source: require('../../../assets/img/cleanup/cleanup_2.jpg'),
    id: 2,
  },
  {
    source: require('../../../assets/img/cleanup/cleanup_4.jpg'),
    id: 3,
  },
];

const factoryImages = [
  {
    source: require('../../../assets/img/cleanup/factory.jpg'),
    id: 1,
  },
  {
    source: require('../../../assets/img/cleanup/factory_1.jpeg'),
    id: 2,
  },
  {
    source: require('../../../assets/img/cleanup/factory_2.jpg'),
    id: 3,
  },
  {
    source: require('../../../assets/img/cleanup/factory_4.jpg'),
    id: 4,
  },
];

const Updates = ({ projectName, title, statusText, text }) => (
  <View style={{ flex: 1, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 15, flex: 1 }}>
      <View style={{ flex: 2 }}>
        <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '500' }}>Status </Text>
      </View>
      <View style={{ flex: 1, marginRight: 5 }}>
        <Tag textColor={WHITE} text={statusText} viewColor={projectStatusTextColor(statusText)} />
      </View>
    </View>
    <View style={{ flex: 4, paddingTop: 3 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '500' }}>Task Name: </Text>
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
        <B color="#201D41"> Evaluation Submissions</B>
      </View>
      <FlatList
        style={{ paddingTop: 10 }}
        data={projectName === 'Aba Factory construction' ? factoryImages : images}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        horizontal
        renderItem={renderItem}
      />
    </View>
  </View>
);

export default Updates;
