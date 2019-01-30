import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import RNGooglePlaces from 'react-native-google-places';
import CalendarBox from '../components/CreateProject/CalendarBox';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import * as API from '../utils/api';
import ExtStyle from '../utils/styles';
import { WHITE, YELLOW } from '../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: WHITE,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputStyle: {
    borderColor: '#B1BAD2',
    width: width / 1.1,
  },
  smallContainer: {
    marginBottom: 15,
  },
});

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'sela', title: 'Choose Photo ' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class CreateProject extends Component {
  static navigationOptions = {
    title: 'Create project',
  };

  state = {
    showFirstCalendar: false,
    showSecondCalendar: false,
    startDate: Date.now(),
    endDate: Date.now(),
    loading: false,
    users: [],
    stakeholders: [],
  };

  async componentDidMount() {
    try {
      const resp = await API.getAllUsers();
      // console.log('res', resp.data);
      const users = resp.data.map(c => {
        c.label = c.firstName.concat(' ').concat(c.lastName);
        c.value = c._id;
        return c;
      });
      this.setState({ users });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  pickImage = async () => {
    console.log('ooo')
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: response.uri,
        });
      }
    });

    // const { status: cameraRollPerm } = await Permissions.askAsync(
    //   Permissions.CAMERA_ROLL,
    // );

    // // only if user allows permission to camera roll
    // if (cameraRollPerm === 'granted') {
    //   const pickerResult = await ImagePicker.launchImageLibraryAsync({
    //     allowsEditing: true,
    //     aspect: [4, 3],
    //   });

    //   await this.handleImagePicked(pickerResult);
    // }
  };

  // upload image to the server
  uploadImageAsync = async data => { };

  handleImagePicked = async pickerResult => {
    let uploadResponse;
    let uploadResult;

    try {
      this.setState({
        uploading: true,
      });
      console.log("ppp", pickerResult.source)

      if (!pickerResult.cancelled) {
        // uploadResponse = await uploadImageAsync(pickerResult.uri);
        // uploadResult = await uploadResponse.json();

        // console.log('picker result', pickerResult)
        this.setState({
          image: pickerResult.uri, // uploadResult.location
        });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        uploading: false,
      });
    }
  };

  openCalender = val => {
    if (val === 'first') {
      this.setState(prevState => ({
        showFirstCalendar: !prevState.showFirstCalendar,
      }));
    } else {
      this.setState(prevState => ({
        showSecondCalendar: !prevState.showSecondCalendar,
      }));
    }
  };

  chooseDate = (day, val) => {
    console.log('selected day', day);
    this.openCalender(val);
  };

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal()
      .then(place => {
        console.log(place);
        // place represents user's selection from the
        // suggestions and it is a simplified Google Place object.
      })
      .catch(error => console.log(error.message)); // error is a Javascript Error object
  }

  chooseContractor = id => {
    const val = [id];
    this.setState({ stakeholders: val });
  };

  submit = async () => {
    const {
      name,
      description,
      tags,
      budget,
      contractors,
      avatar,
      startDate,
      endDate,
      stakeholders,
      //  places:
    } = this.state;


    const data = {
      name,
      description,
      startDate: '2018-11-29',
      endDate: '2018-11-29',
      tags,
      budget,
      contractors: stakeholders,
      avatar: 'https://placeimg.com/200/200/people',
      location: {
        name: 'south-west',
        lat: 945054,
        lng: 744738,
      },
    };
    console.log('data', data);

    this.setState({ loading: true });

    try {
      const resp = await API.addProject(data);
      console.log('server', resp.data);
      this.setState({ loading: false });
      if (resp.data.success === true) {
        this.props.navigation.navigate('Success');
      }
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  render() {
    const { avatarSource, showFirstCalendar, showSecondCalendar, loading, users } = this.state;
    const avatar = require('../../assets/selectImage.png');
    const avatarURI = avatarSource || '';
    const icon = avatarURI === '' ? avatar : { uri: avatarURI };
    return (
      <KeyboardAwareScrollView
        // innerRef={ref => {
        //   this.scroll = ref;
        // }}
        // resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled
      >
        <View style={styles.smallContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}> Name your project </Text>
          </View>
          <Input
            text="Project title"
            style={styles.inputStyle}
            textSyle="#BBBBBB"
            placeHolderColor="#B1BAD2"
            onChangeTheText={name => this.setState({ name })}
            onTheChange={() =>
              this.setState({
                nameError: false,
                nameErrorMessage: '',
              })
            }
          />
        </View>

        <View style={styles.smallContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}> Add a project description </Text>
          </View>
          <Input
            text="Project  description"
            multiline
            style={[styles.inputStyle, { height: 150 }]}
            textStyle={{
              textAlignVertical: 'top',
              marginTop: '2%',
              marginLeft: '2%',
            }}
            placeHolderColor="#B1BAD2"
            onChangeTheText={description => this.setState({ description })}
            onTheChange={() =>
              this.setState({
                descriptionError: false,
                descriptionErrorMessage: '',
              })
            }
          />
        </View>
        <View style={styles.smallContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}> Project Tags (Seperate with a comma) </Text>
          </View>
          <Input
            text="e.g education, sustainable cities"
            style={styles.inputStyle}
            placeHolderColor="#B1BAD2"
            onChangeTheText={tags => this.setState({ tags })}
            onTheChange={() =>
              this.setState({
                tagsError: false,
                tagsErrorMessage: '',
              })
            }
          />
        </View>
        <View style={styles.smallContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}> Budget or financial Goal(if fundraising) </Text>
          </View>
          <Input
            text="Enter amount in USD"
            style={styles.inputStyle}
            placeHolderColor="#B1BAD2"
            numb
            onChangeTheText={budget => this.setState({ budget })}
            onTheChange={() =>
              this.setState({
                budgetError: false,
                budgetErrorMessage: '',
              })
            }
          />
        </View>

        <View style={styles.smallContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}> Set the location </Text>
          </View>
          <Input
            text="Search places"
            style={styles.inputStyle}
            placeHolderColor="#B1BAD2"
            // onChangeTheText={() => this.openSearchModal()}
            onChangeTheText={places => console.log('places')}
            onTheChange={() =>
              this.setState({
                placesError: false,
                placesErrorMessage: '',
              })
            }
          />
        </View>
        <View style={styles.smallContainer}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}>
              {` Add contractors and team members to the project `}
            </Text>
          </View>
          {/* <View style={ExtStyle.flex1}> */}
          <Dropdown
            containerStyle={[
              {
                height: height / 13,
                justifyContent: 'center',
                paddingLeft: 10,
                borderRadius: 5,
                borderColor: '#F5F5F8',
                borderWidth: 1,
              },
              styles.inputStyle,
            ]}
            onChangeText={id => this.chooseContractor(id)}
            data={users}
          />
          {/* </View> */}
        </View>

        <View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}> Project Avatar </Text>
          </View>
          <View
            style={{
              backgroundColor: '#F5F5F8',
              width: width / 1.1,
              height: height / 9,
              borderRadius: 10,
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                width: width / 1.1,
                height: height / 9,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.pickImage()}
            >
              <Image
                style={
                  avatarURI !== ''
                    ? {
                      width: width / 1.1,
                      height: height / 9,
                    }
                    : null
                }
                source={icon}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10,
            flexDirection: 'row',
            width: width / 1.1,
            justifyContent: 'space-between',
          }}
        >
          <CalendarBox
            upText="Start Date"
            downText="11/08/2018"
            val="first"
            showCalendar={showFirstCalendar}
            openCalender={this.openCalender}
            chooseDate={this.chooseDate}
          />
          <Fragment>
            {showFirstCalendar === true || showSecondCalendar === true ? (
              <Fragment />
            ) : (
                <View style={{ justifyContent: 'center' }}>
                  <Image source={require('../../assets/minus.png')} />
                </View>
              )}
          </Fragment>
          <CalendarBox
            upText="End Date"
            downText="11/08/2018"
            val="second"
            showCalendar={showSecondCalendar}
            openCalender={this.openCalender}
            chooseDate={this.chooseDate}
          />
        </View>
        <View>
          <Button
            text="Create Project"
            color={YELLOW}
            medium
            textColor={WHITE}
            style={styles.inputStyle}
            loading={loading}
            fn={() => this.submit()}
          />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
