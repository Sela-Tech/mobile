import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Picker } from 'react-native';
import Box from './OverviewComp/Box';
import StandardText from '../../components/StandardText';
import { WHITE } from '../../utils/constants';
import ExtStyle from '../../utils/styles';
import { firstLetterCapital } from '../../utils/helpers';
import Text from '../../components/Text';
import DModal from '../../components/OverView/Modal';
import DropdownAlert from 'react-native-dropdownalert';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  subContainer: {
    flex: 5,
    marginTop: height / 4,
    alignItems: 'center',
  },
  button: {
    width: width / 2,
  },
  pt10: {
    paddingTop: 10,
  },
  topContainer: {
    paddingTop: 10,
    flex: 1,
  },
  topTextContainer: {
    color: '#222829',
    fontSize: 15,
  },
  healthContainer: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    color: '#201D41',
    fontSize: 14,
  },
  picker: {
    borderColor: '#B1BAD2',
    borderRadius: 5,
    borderWidth: 1,
    height: height / 13,
  },
  inputStyle: {
    borderColor: '#B1BAD2',
    width: width / 1.1,
  },
});

class Overview extends Component {
  state = {
    filterBy: 1,
    content: '',
    visibility: false,
  };

  show = (val) => {
    this.setState(prevState => ({
      visibility: !prevState.visibility,
      content: val === 'COMMUNITY' ? 'Community members answered a survey telling how they felt about their environment being affected by unresolved oil spills'
        : 'For the purpose of this pilot, a single parameter was used to determine possible range of hydrocarbons reported as total petroleum hydrocarbon (TPH). The TPH content of the samples was determined using Gravimetric and spectrophotometric methods'
    }));
  }

  render() {
    const { filterBy, visibility } = this.state;
    const { project, navigation } = this.props;
    return (
      <ScrollView style={styles.container} contentContainerStyle={ExtStyle.flexGrow}>
        <View style={styles.topContainer}>
          <Text style={styles.topTextContainer}>{firstLetterCapital(project.description)}</Text>
        </View>
        <View style={styles.pt10}>
          {/* <CalendarBox /> */}

          <Picker
            style={{
              height: height / 15,
              width: width / 2,
            }}
            selectedValue={filterBy}
            onValueChange={filterBy => this.setState({ filterBy })}
          >
            <Picker.Item label="Last 30 days" value="01" />
            <Picker.Item label="Last 60 days" value="02" />
            <Picker.Item label="Forever" value="03" />

          </Picker>
        </View>
        <StandardText
          text="Project Health Overview"
          viewStyle={styles.healthContainer}
          textStyle={styles.text}
        />
        <Fragment>
          {
            project.name === 'ABA FACTORY CONSTRUCTION' ? (
              <Fragment>
                <Box
                  upText="Tasks Completed"
                  secondTextLeft="13"
                  navigation={navigation}
                  show={this.show}
                //  secondTextRight="+6.9%"
                />
                <Box
                  upText="Progress"
                  secondTextLeft="70%"
                  show={this.show}
                // secondTextRight="+12.4%"
                />

                <Box
                  show={this.show}
                  upText="Total Funds Spent"
                  secondTextLeft="$1595"
                //  secondTextRight="+3.2%"
                />

                <Box
                  upText="Budget Used"
                  secondTextLeft="70%"
                  show={this.show}
                  // secondTextRight="+12.4%"
                  lastText="Total Budget"
                />
              </Fragment>
            ) :
              (
                <Fragment>


                  <Box
                    show={this.show}
                    upText="Changes in TPH Level"
                  // secondTextLeft="$1595"
                  //  secondTextRight="+3.2%"
                  />

                  <Box
                    show={this.show}
                    upText="Community Feedback"
                    secondTextLeft="$1595"
                  //  secondTextRight="+3.2%"
                  />

                  <Box
                    show={this.show}
                    upText="Community Feedback"
                    secondTextLeft="$1595"
                  //  secondTextRight="+3.2%"
                  />

                  <Box
<<<<<<< HEAD
                    upText="Budget Used"
                    secondTextLeft="70%"
                    // secondTextRight="+12.4%"
                    lastText="Total Budget"
=======
                    show={this.show}
                    upText="budget"
>>>>>>> abf39b00ad611a40eed012374cff68e51d7d5a0b
                  />


                </Fragment>
              )
          }
        </Fragment>
        <DModal
          visibility={visibility}
          show={this.show}
          content={this.state.content}
        />
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          // startDelta={height}
          // endDelta={height - height / 8}
          closeInterval={6000}
        />
      </ScrollView>
    );
  }
}

export default Overview;
