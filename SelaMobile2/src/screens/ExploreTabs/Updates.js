import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import Text from '../../components/Text';
import IndUpdates from '../../components/ExploreProject/Updates';
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


export default class Updates extends Component {
  render() {
    const project = this.props;
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <IndUpdates statusText="In Progress" />
        <IndUpdates statusText="Completed" />
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
  }
}
