import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Picker } from 'react-native';
import Box from './OverviewComp/Box';
import StandardText from '../../components/StandardText';
import { WHITE } from '../../utils/constants';
import ExtStyle from '../../utils/styles';
import { firstLetterCapital } from '../../utils/helpers';
import Text from '../../components/Text';
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
  };

  render() {
    const { filterBy } = this.state;
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
                //  secondTextRight="+6.9%"
                />
                <Box
                  upText="Progress"
                  secondTextLeft="70%"
                // secondTextRight="+12.4%"
                />

                <Box
                  upText="Total funds spent"
                  secondTextLeft="$1595"
                //  secondTextRight="+3.2%"
                />

                <Box
                  upText="Budget used"
                  secondTextLeft="70%"
                  // secondTextRight="+12.4%"
                  lastText="Total budget"
                />
              </Fragment>
            ) :
              (
                <Fragment>


                  <Box
                    upText="Changes in TPH Level"
                  // secondTextLeft="$1595"
                  //  secondTextRight="+3.2%"
                  />

                  <Box
                    upText="Community Feedback"
                    secondTextLeft="$1595"
                  //  secondTextRight="+3.2%"
                  />

                  <Box
                    upText="Budget used"
                    secondTextLeft="70%"
                    // secondTextRight="+12.4%"
                    lastText="Total budget"
                  />

                </Fragment>
              )
          }
        </Fragment>
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
