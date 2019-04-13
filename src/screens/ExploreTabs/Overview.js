import React, { Component, Fragment } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Picker,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Box from './OverviewComp/Box';
import StandardText from '../../components/StandardText';
import { WHITE, YELLOW } from '../../utils/constants';
import ExtStyle from '../../utils/styles';
import { firstLetterCapital } from '../../utils/helpers';
import Text from '../../components/Text';

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
    // paddingTop: 10,
  },
  topContainer: {
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
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
  floatingButton: {
    backgroundColor: YELLOW,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 35,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    // path: 'images',
  },
};

class Overview extends Component {
  state = {
    filterBy: 1,
  };

  uploadFile = () => {
    // Launch Camera:
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        alert('image uploaded successfully');
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  render() {
    const { filterBy } = this.state;
    const { project, userRole } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container} contentContainerStyle={ExtStyle.flexGrow}>
          <View style={styles.topContainer}>
            <Text style={styles.topTextContainer}>{firstLetterCapital(project.description)}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Picker
              style={{
                height: height / 15,
                width: width / 2,
              }}
              selectedValue={filterBy}
              onValueChange={val => this.setState({ filterBy: val })}
            >
              <Picker.Item label="Last 30 days" value="01" />
              <Picker.Item label="Last 60 days" value="02" />
              <Picker.Item label="Forever" value="03" />
            </Picker>
          </View>
          <View style={{ flex: 3 }}>
            <StandardText
              text="Project Health Overview"
              viewStyle={styles.healthContainer}
              textStyle={styles.text}
            />
          </View>
          <Box upText="Tasks Completed" secondTextLeft="13" />
          {/* <Box upText="Progress" secondTextLeft="70%" />

          <Box upText="Total funds spent" secondTextLeft="$1595" /> */}

          {/* <Box upText="Budget used" secondTextLeft="70%" lastText="Total budget" /> */}
        </ScrollView>
        <Fragment>
          {userRole === 'funder' ? null : (
            <View style={styles.floatingButton}>
              <TouchableOpacity onPress={() => this.uploadFile()}>
                <Image source={require('../../../assets/plus.png')} />
              </TouchableOpacity>
            </View>
          )}
        </Fragment>
      </View>
    );
  }
}

export default Overview;
