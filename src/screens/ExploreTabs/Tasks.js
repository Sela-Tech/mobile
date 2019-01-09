import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image, FlatList } from 'react-native';
import Text from '../../components/Text';
import Updates from '../../components/ExploreProject/Updates';
import EvalSubmission from '../../components/ExploreProject/EvalSubmission';
import Button from '../../components/Button';
import { WHITE } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 15,
    backgroundColor: WHITE,
  },
  subContainer: {
    flex: 1,
    marginTop: height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: width / 2,
  },
});

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

export default () => (
  <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
    <Updates statusText="In Progress" />
    <Updates statusText="Completed" />
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 10,
      }}
    >
      <View>
        <Text style={{ color: '#201D41' }}> View transactions</Text>
      </View>
      <View style={{ justifyContent: 'center', paddingLeft: 10 }}>
        <Image source={require('../../../assets/forward-arrow.png')} />
      </View>
    </View>
    <View style={{ paddingTop: 10, alignItems: 'center' }}>
      <Button text="INVEST" />
    </View>
  </ScrollView>
);
