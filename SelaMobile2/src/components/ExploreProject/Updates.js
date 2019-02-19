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


const task1 = [
  {
    source: require('../../../assets/tasks/task_1_pond_identification.jpg'),
    id: 1,
  },
  {
    source: require('../../../assets/tasks/task_1_site_identification.jpg'),
    id: 2,
  },
  {
    source: require('../../../assets/tasks/task_1_site_identification1.jpg'),
    id: 3,
  },
  {
    source: require('../../../assets/img/cleanup/factory_4.jpg'),
    id: 4,
  },
];


const task2 = [
  {
    source: require('../../../assets/tasks/task_2_VSE_team.jpg'),
    id: 1,
  },
  {
    source: require('../../../assets/tasks/task_2_VSE_team1.jpg'),
    id: 2,
  },
  {
    source: require('../../../assets/tasks/task_2_VSE_team2.jpg'),
    id: 3,
  },
];

const task3 = [
  {
    source: require('../../../assets/tasks/task_3_site_preparation.png'),
    id: 1,
  },
  {
    source: require('../../../assets/tasks/task_3_site_preparation1.png'),
    id: 2,
  },
];


const task4 = [
  {
    source: require('../../../assets/tasks/task_4_biotechnology_application.jpg'),
    id: 1,
  },
  {
    source: require('../../../assets/tasks/task_4_biotechnology_application1.jpg'),
    id: 2,
  },
];

const task5 = [
  {
    source: require('../../../assets/tasks/task_5_biotechnology_application.jpg'),
    id: 1,
  },
  {
    source: require('../../../assets/tasks/task_5_collection_samples.png'),
    id: 2,
  },
  {
    source: require('../../../assets/tasks/task_5_collection_samples1.png'),
    id: 3,
  },
];

const task10 = [
  {
    source: require('../../../assets/tasks/task_10_report.png'),
    id: 1,
  },
  {
    source: require('../../../assets/tasks/task_10_report1.png'),
    id: 3,
  },
  {
    source: require('../../../assets/tasks/task_5_collection_samples1.png'),
    id: 2,
  },
];

const taskName = val => {
  switch (val) {
    case 'Identification of ponds to be treated':
      return task1;
    case 'Identification of VSE teams':
      return task2;
    case 'Site preparation':
      return task3;
    case 'Biotechnology application 1':
      return task4;
    case 'Biotechnology application 2':
      return task5;
    case 'Collection of laboratory result':
      return task10;
    default:
      return task1;
  }
}


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
        data={projectName === 'ABA FACTORY CONSTRUCTION' ? factoryImages : taskName(title)}//
        //  images}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        horizontal
        renderItem={renderItem}
      />
    </View>
  </View>
);

export default Updates;


