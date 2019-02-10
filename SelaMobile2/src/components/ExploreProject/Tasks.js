import React from 'react';
import { View } from 'react-native';
import Text from '../Text';
import Tag from '../Tag';

const Tasks = ({ statusText, text, title }) => (
  <View style={{ flex: 1, marginBottom: 10 }}>
    <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 15, flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#696F74', fontWeight: '400' }}>Status </Text>
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
        <Text style={{ color: '#222829' }}>{text}</Text>
        {/* <Text style={{ color: '#222829' }}>
          This is where the brief description of the task goes. This is where the brief description
          of the task goes. This is where the brief description of the task goes. This is where the
          brief description of the task goes. This is where the brief description of the task goes.
        </Text> */}
      </View>
    </View>
  </View>
);

export default Tasks;
