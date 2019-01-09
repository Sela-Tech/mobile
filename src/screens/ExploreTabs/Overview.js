import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import CalendarBox from '../../components/Transactions/CalendarBox';
import Button from '../../components/Button';
import Text from '../../components/Text';
import SingleTrans from '../../components/Transactions/SingleTrans';
import { WHITE } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  subContainer: {
    flex: 5,
    marginTop: height / 4,
    alignItems: 'center',
  },
  button: {
    width: width / 2,
  },
});

export default class Overview extends Component {
  state = {
    empty: false,
  };

  render() {
    const { empty } = this.state;
    if (empty) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Image source={require('../../../assets/docs.png')} />
          </View>
          <View style={{ alignItems: 'center', margin: 10 }}>
            <Text> There are no transactions yet for </Text>
            <Text> this project. Check back later. </Text>
          </View>

          <Button text="INVEST" textColor={WHITE} />
        </View>
      );
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        <CalendarBox />
        <SingleTrans price="$10,500" date="13 Jun 2018, 14:55" />
        <SingleTrans price="$10,500" date="13 Jun 2018, 14:55" />
        <SingleTrans price="$10,500" date="13 Jun 2018, 14:55" />
        <SingleTrans price="$10,500" date="13 Jun 2018, 14:55" />
        <View style={{ alignItems: 'center' }}>
          <View>
            <Button text="INVEST" />
          </View>
          <View style={{ marginTop: 10 }}>
            <Button
              text="Join as Evaluation Agent"
              color={WHITE}
              textColor="#201D41"
              style={{ borderWidth: 2, borderColor: '#B1BAD2' }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
