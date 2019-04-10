import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import Tag from '../Tag';
import ExtStyles from '../../utils/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
});
const Tasks = ({ statusText, text, title }) => (
  <View style={styles.container}>
    <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 15, flex: 1 }}>
      <View style={ExtStyles.flex1}>
        <Text style={{ color: '#696F74', fontWeight: '400' }}>Status </Text>
      </View>
      <Tag
        textColor={statusText === 'In Progress' ? '#369C05' : '#E06811'}
        viewColor={statusText === 'In Progress' ? '#d2fdbf' : '#f7bc92'}
        text={statusText}
      />
    </View>
    <View style={ExtStyles.flex4}>
      <View>
        <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '400' }}>Name of Task </Text>
      </View>
      <View style={{ marginTop: '2%' }}>
        <Text style={{ color: '#222829' }}>{text}</Text>
      </View>
    </View>
  </View>
);

export default Tasks;
