import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Text from '../components/Text';
import B from '../components/BoldText';
import { WHITE } from '../utils/constants';
import Box from '../components/ExploreProject/Box';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: WHITE,
    paddingBottom: 20,
  },
  textContainer: {
    marginLeft: '5%',
    marginTop: '3%',
  },
  otherContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default class ViewProject extends Component {
  static navigationOptions = {
    title: 'EXPLORE',
    headerStyle: {
      fontFamily: 'proximaNova',
      fontWeight: 'normal',
    },
  };

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: WHITE,
        }}
        contentContainerStyle={styles.container}
      >
        <View style={styles.textContainer}>
          <Text>
            {' '}
            Showing all projects in
            <B> Lagos,Nigeria</B>
{' '}
with status
{' '}
          </Text>
          <Text>
            {' '}
            <B>Completed</B>, tagged<B>Sustainable Cities</B>{' '}
          </Text>
        </View>
        <View style={styles.otherContainer}>
          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <Box
              img={require('../../assets/img/man.png')}
              firstText="K-Dere Portharcourt"
              secondText="Sustainability Intl"
              thirdText="OnGoing"
              title="Affordable housing scheme - 200 Units"
              cost="$50,000"
              tags={['Resilient infrasture', 'Sustainable Cities']}
              fn={() => this.props.navigation.navigate('ExploreProject')}
            />
          </View>

          <View>
            <Box
              img={require('../../assets/img/woman.png')}
              firstText="K-Dere Portharcourt"
              secondText="Sustainability Intl"
              thirdText="Proposed"
              title="Affordable housing scheme - 200 Units"
              cost="$25,000"
              tags={['Resilient infrasture', 'Sustainable Cities']}
              fn={() => this.props.navigation.navigate('ExploreProject')}
            />
          </View>
          <View>
            <Box
              img={require('../../assets/img/woman.png')}
              firstText="K-Dere Portharcourt"
              secondText="Sustainability Intl"
              thirdText="Proposed"
              title="Affordable housing scheme - 200 Units"
              cost="$25,000"
              tags={['Resilient infrasture', 'Sustainable Cities']}
              fn={() => this.props.navigation.navigate('ExploreProject')}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
