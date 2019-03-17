import React, { Component, Fragment } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Image,
  TouchableOpacity,
  // Picker,
} from 'react-native';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import MultiSelect from 'react-native-multiple-select';
import RNGooglePlaces from 'react-native-google-places';
import moment from 'moment';
import CalendarBox from '../components/CreateProject/CalendarBox';
import SearchResult from '../components/SearchResult';
import Input from '../components/Input';
import Text from '../components/Text';
import Button from '../components/Button';
import { uploadImageToAWS } from '../utils/helpers';
import * as API from '../utils/api';
import { WHITE, YELLOW } from '../utils/constants';
import ExtStyle from '../utils/styles';

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
  multiSelect: {
    borderColor: '#B1BAD2',
    width: width / 1.1,
    borderRadius: 5,
    // borderWidth: 1,
  },
  smallContainer: {
    marginBottom: 15,
  },
  picker: {
    borderColor: '#B1BAD2',
    borderRadius: 5,
    borderWidth: 1,
    height: height / 13,
  },
});

const options = {
  title: 'Select Avatar',
  // customButtons: [{ name: 'sela', title: 'Choose Photo ' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class CreateProject extends Component {
  static navigationOptions = {
    title: 'Create project',
  };

  state = {
    showFirstCalendar: false,
    showSecondCalendar: false,
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    loading: false,
    users: [],
    selectedUsers: [],
    selectedItems: [],
    stakeholderName: '',
    stakeholders: [],
    googlePlaces: [],
    locationObj: {
      name: 'south-west',
      lat: 945054,
      lng: 744738,
    },
  };

  async componentDidMount() {
    try {
      const resp = await API.getAllUsers();
      const users = resp.data.map(c => {
        c.label = c.firstName.concat(' ').concat(c.lastName);
        c.value = c._id;
        return c;
      });
      this.setState({ users, stakeholderName: [users[0]._id] });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  pickImage = async () => {
    ImagePicker.showImagePicker(options, response => {
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
  };

  handleImagePicked = async pickerResult => {
    let uploadResponse;
    let uploadResult;

    try {
      this.setState({
        uploading: true,
      });

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
    this.openCalender(val);
  };

  searchResult = async () => {
    const { places } = this.state;

    RNGooglePlaces.getAutocompletePredictions(`${places}`, {})
      .then(place => {
        this.setState({ googlePlaces: place });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  handleSelectedAddress = (payload, id) => {
    Keyboard.dismiss();
    RNGooglePlaces.lookUpPlaceByID(id)
      .then(results =>
        this.setState({
          searchResult: false,
          googlePlaces: [],
          location: payload,
          locationObj: {
            name: payload,
            lat: results.latitude,
            lng: results.longitude,
          },
        }),
      )
      .catch(err => {
        this.setState({
          searchResult: false,
          googlePlaces: [],
          location: payload,
          error: err.message,
        });
      });
  };

  submit = async () => {
    const cred = this.props && this.props.credentials && this.props.credentials.credentials;

    const {
      name,
      description,
      selectedItems,
      budget,
      contractors,
      avatar,
      startDate,
      endDate,
      stakeholders,
      stakeholderNames,
      users,
      selectedUsers,
      locationObj,
      avatarSource,
    } = this.state;

    const data = {
      name,
      description,
      startDate,
      endDate,
      tags: selectedItems,
      budget,
      goal: budget,
      stakeholders: selectedUsers.length === 0 ? [] : selectedUsers, // [selectedUsers[0]],
      location: locationObj,
    };

    this.setState({ loading: true });
    try {
      const imageLink = await uploadImageToAWS(avatarSource, cred);
      data.avatar = imageLink;
      const resp = await API.addProject(data);
      this.setState({ loading: false });
      if (resp.data.success === true) {
        this.props.navigation.navigate('Success');
      } else {
        this.dropdown.alertWithType('error', 'Error', resp.data.message);
      }
    } catch (err) {
      this.dropdown.alertWithType('error', 'Error', err.message);
      this.setState({ loading: false, error: err.message });
    }
  };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  onSelectedUsersChange = selectedUsers => {
    this.setState({ selectedUsers });
  };

  selectDate = (val, day) => {
    if (day === 'Start Date') {
      this.setState({
        startDate: val.dateString,
        showFirstCalendar: false,
      });
    } else {
      this.setState({
        endDate: val.dateString,
        showSecondCalendar: false,
      });
    }
  };

  render() {
    const {
      selectedItems,
      avatarSource,
      showFirstCalendar,
      showSecondCalendar,
      loading,
      // users,
      googlePlaces,
      location,
      searchResult,
      stakeholderName,
      startDate,
      endDate,
      selectedUsers,
    } = this.state;
    const avatar = require('../../assets/selectImage.png');
    const avatarURI = avatarSource || '';
    const icon = avatarURI === '' ? avatar : { uri: avatarURI };
    let { users } = this.state;
    users = users.map((c, index) => {
      c.id = c._id;
      c.name = c.firstName.concat(' ').concat(c.lastName);
      return c;
    });

    const items = [
      {
        id: 'Education',
        name: 'Education',
      },
      {
        id: 'Clean Water',
        name: 'Clean Water',
      },
      {
        id: 'No Poverty',
        name: 'No Poverty',
      },
      {
        id: 'Infrastructure',
        name: 'Infrastructure',
      },
      {
        id: 'Zero Hunger',
        name: 'Zero Hunger',
      },
      {
        id: 'Health & Well-being',
        name: 'Health & Well-being',
      },
      {
        id: 'Gender Equality',
        name: 'Gender Equality',
      },
      {
        id: 'Water & Sanitation',
        name: 'Water & Sanitation',
      },
      {
        id: 'Economic Growth',
        name: 'Economic Growth',
      },
      {
        id: 'Clean Energy',
        name: 'Clean Energy',
      },
      {
        id: 'Sustainable Cities',
        name: 'Sustainable Cities',
      },
      {
        id: 'Climate Action',
        name: 'Climate Action',
      },
      {
        id: 'Life Below Water',
        name: 'Life Below Water',
      },
      {
        id: 'Life on Land',
        name: 'Life on Land',
      },
      {
        id: 'Responsible Consumption & Production',
        name: 'Responsible Consumption & Production',
      },
    ];
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
            style={[styles.inputStyle, { height: height / 5.1 }]}
            textStyle={ExtStyle.multiLineInputStyle}
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
          {/* <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 15 }}> Select Project Tags </Text>
          </View> */}
          <View style={styles.multiSelect}>
            <MultiSelect
              // hideTags
              canAddItems
              items={items}
              uniqueKey="id"
              ref={component => {
                this.multiSelect = component;
              }}
              hideSubmitButton
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Pick project tags"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={text => console.log(text)}
              altFontFamily="ProximaNova-Light"
              tagRemoveIconColor="#CCC"
              tagBorderColor="#B1BAD2"
              tagTextColor="#CCC"
              selectedItemTextColor={YELLOW}
              selectedItemIconColor={YELLOW}
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              submitButtonColor={YELLOW}
              submitButtonText="Submit"
            />
          </View>
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
            value={location}
            text="Search places"
            style={styles.inputStyle}
            placeHolderColor="#B1BAD2"
            onChangeTheText={places => this.setState({ places })}
            onTheChange={() => this.searchResult()}
          />
          {
            <Fragment>
              {googlePlaces.length === 0 ? null : (
                <SearchResult
                  places={googlePlaces}
                  searchResult={searchResult}
                  handleSelectedAddress={(payload, id) => this.handleSelectedAddress(payload, id)}
                />
              )}
            </Fragment>
          }
        </View>
        <View style={styles.smallContainer}>
          <View>
            {/* <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 15 }}>
                {` Add contractors and team members to the project `}
              </Text>
            </View> */}

            <View style={styles.multiSelect}>
              <MultiSelect
                // hideTags
                canAddItems
                items={users}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                hideSubmitButton
                onSelectedItemsChange={this.onSelectedUsersChange}
                selectedItems={selectedUsers}
                selectText="Pick contractors"
                searchInputPlaceholderText="Search Contractor..."
                onChangeInput={text => console.log(text)}
                altFontFamily="ProximaNova-Light"
                tagRemoveIconColor="#CCC"
                tagBorderColor="#B1BAD2"
                tagTextColor="#CCC"
                selectedItemTextColor={YELLOW}
                selectedItemIconColor={YELLOW}
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor={YELLOW}
                submitButtonText="Submit"
              />
            </View>
            {/* <View style={[styles.inputStyle, styles.picker]}>
              <Picker
                style={[styles.inputStyle, styles.picker]}
                selectedValue={stakeholderName}
                onValueChange={stakeholder =>
                  this.setState({ stakeholderName: stakeholder, stakeholderNames: [stakeholder] })
                }
              >
                {users.map((contractor, i) => {
                  const { firstName, lastName } = contractor;
                  return (
                    <Picker.Item
                      style={[styles.inputStyle, styles.picker]}
                      key={i}
                      label={firstName.concat(' ').concat(lastName)}
                      value={contractor._id}
                    />
                  );
                })}
              </Picker>
            </View> */}
          </View>
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
            dDate={startDate}
            downText={startDate}
            // downText="11/08/2018"
            val="first"
            showCalendar={showFirstCalendar}
            openCalender={this.openCalender}
            chooseDate={this.chooseDate}
            selectDate={this.selectDate}
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
            dDate={endDate}
            // downText="11/08/2018"
            downText={endDate}
            val="second"
            showCalendar={showSecondCalendar}
            openCalender={this.openCalender}
            chooseDate={this.chooseDate}
            selectDate={this.selectDate}
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
        <DropdownAlert
          ref={ref => (this.dropdown = ref)}
          startDelta={height}
          endDelta={height - height / 8}
          closeInterval={6000}
        />
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => ({
  credentials: state.credentials,
});

export default connect(mapStateToProps)(CreateProject);
