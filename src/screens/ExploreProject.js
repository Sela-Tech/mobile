import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Header from '../components/ExploreTopTabs/Header';
import Navigator from './ExploreTabs/Navigator';


export default class ExploreProject extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Image style={{ height: 200 }} source={require('../../assets/class.png')} />
        </View>
        <View style={{ flex: 3 }}>
          <Header
            projectLocationText="LAGOS, NIGERIA."
            projectStatusText="COMPLETED"
            projectNameText="MARKERS LTD"
            projectTitleText="Construction of Classroom Blocks"
            budgetAmount="$1,500,000"
            numberOfStakeholders="1"
            raisedAmount="0"
            tags={['Resilient infrasture', 'Sustainable Cities']}
          />
        </View>
        <View style={{ flex: 6 }}>
          <Navigator />
        </View>
      </View>
    );
  }
}

