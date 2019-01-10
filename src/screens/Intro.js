import React from 'react';
import { StyleSheet } from 'react-native';

import AppIntroSlider from '../components/npm/AppIntroSlider';
import IntroComp from '../components/Intro/Intro';
import Home from './Home';
import { YELLOW } from '../utils/constants';

const first = `Update to Find, fund and track 
              development projects in the emerging 
              world. See how your contribution impacts 
              the UN's Sustainable Development Goals.`;

const second = `Execute development projects with
                transparency and impact-driven
                measurements.`;

const third = `Evaluate the progress of development 
               projects within the community. Become 
               an active participate in leading change 
               through accountability.`;

const styles = StyleSheet.create({
  image: {
    height: '70%',
    width: '100%',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const slides = [
  {
    key: 'first',
    image: require('../../assets/img/building.png'),
  },
  {
    key: 'second',
    image: require('../../assets/img/man.png'),
    imageStyle: styles.image,
  },
  {
    key: 'third',
    image: require('../../assets/img/woman.png'),
  },
];

export default class Intro extends React.Component {
  state = {
    showRealApp: false,
  };

  onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  };

  renderItem = props => (
    <IntroComp
      image={props.image}
      shortText={props.key === 'first' ? 'Fund' : props.key === 'second' ? 'Execute' : 'Evaluate'}
      longText={props.key === 'first' ? first : props.key === 'second' ? second : third}
    />
  );

  render() {
    const { showRealApp } = this.state;
    if (showRealApp) {
      return <Home props={this.props} />;
    }
    return (
      <AppIntroSlider
        style={{ flex: 1 }}
        activeDotStyle={{
          backgroundColor: YELLOW,
        }}
        showSkipButton
        slides={slides}
        renderItem={this.renderItem}
        onDone={this.onDone}
      />
    );
  }
}
