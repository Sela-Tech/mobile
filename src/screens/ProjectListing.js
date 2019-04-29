import React, { Component, Fragment } from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  FlatList,
  StyleSheet,
  Dimensions,
  Picker,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import RNGooglePlaces from 'react-native-google-places';
import NavigationService from '../services/NavigationService';
import SearchResult from '../components/SearchResult';
import { getAllfeaturedProjects } from '../utils/api';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
import Header from '../components/Header';
import Button from '../components/Button';
import Text from '../components/Text';
import { WHITE, YELLOW } from '../utils/constants';
import ExtStyle from '../utils/styles';
import { isAndroid } from '../utils/helpers';
import Box from '../components/ExploreProject/Box';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: WHITE,
  },
  subContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  inputStyle: {
    borderColor: '#B1BAD2',
    width: width / 1.1,
  },
  picker: {
    borderColor: '#B1BAD2',
    borderRadius: 5,
    borderWidth: 1,
    height: height / 13,
  },
});

const tags = [
  'No Poverty',
  'Zero Hunger',
  'Health & Well-being',
  'Education',
  'Gender Equality',
  'Water & Sanitation',
  'Clean Energy',
  'Economic Growth',
  'Infrastructure',
  'Reduced Inequality',
  'Sustainable Cities',
  'Climate Action',
  'Life Below Water',
  'Life on Land',
  'Responsible Consumption & Production',
];

const projectStatus = ['ON GOING', 'DORMANT', 'COMPLETED', 'PROPOSED', 'IN REVIEW'];

const otherFilters = ['Bookmarked project', 'Project that may Interest you'];

const renderItem = item => (
  <View style={{ marginBottom: 10, marginTop: 10 }}>
    <Box
      fn={() => NavigationService.navigate('ExploreProject', item.item._id)}
      img={{ uri: item.item['project-avatar'] }}
      firstText={item.item.location.name}
      secondText={item.item.name}
      thirdText={item.item.status}
      title={item.item.description}
      cost={item.item.implementationBudget}
      tags={item.item.tags}
    />
  </View>
);

const keyExtractor = (item, index) => index.toString();
class ExploreProject extends Component {
  state = {
    loading: true,
    refreshing: false,
    googlePlaces: [],
    relevantProject: otherFilters,
  };

  async componentDidMount() {
    await this.loadInitialData();
  }

  loadInitialData = async () => {
    try {
      const resp = await getAllfeaturedProjects('');
      if (resp.data.success === true) {
        this.setState({ loading: false, projects: resp.data.projects });
      } else {
        this.setState({
          loading: false,
          error: 'failed',
        });
      }
    } catch (err) {
      this.setState({ loading: false });
    }
  };

  loadMore = async () => {
    // try {
    //   const resp = await getAllfeaturedProjects({ limit: 20 });
    //   if (resp.data.success === true) {
    //     this.setState({ loading: false, projects: resp.data.projects });
    //   } else {
    //     this.setState({
    //       loading: false,
    //       error: 'failed',
    //     });
    //   }
    // } catch (err) {
    //   this.setState({ loading: false });
    // }
  };

  searchResult = async () => {
    const { places } = this.state;

    RNGooglePlaces.getAutocompletePredictions(`${places}`, {})
      .then(place => {
        this.setState({ googlePlaces: place });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.loadInitialData();
    this.setState({ refreshing: false });
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

  render() {
    const {
      loading,
      relevantProject,
      projects,
      status,
      tag,
      googlePlaces,
      relevantProjectVal,
      searchResult,
      refreshing,
      location,
    } = this.state;

    return (
      <ScrollView
        style={{
          backgroundColor: WHITE,
          flex: 1,
        }}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
      >
        <Header headerName="EXPLORE" />
        <View style={styles.subContainer}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: isAndroid ? '5%' : 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '300' }}>Search for Projects</Text>
          </View>
          <View style={ExtStyle.flex1}>
            <View style={{ paddingBottom: 15 }}>
              <Input
                value={location}
                text="All Locations"
                style={styles.inputStyle}
                placeHolderColor="#696F74"
                onChangeTheText={places => this.setState({ places })}
                onTheChange={() => this.searchResult()}
                sideImage={require('../../assets/location.png')}
                sideImageStatus
              />
              {
                <Fragment>
                  {googlePlaces.length === 0 ? null : (
                    <SearchResult
                      places={googlePlaces}
                      searchResult={searchResult}
                      handleSelectedAddress={(payload, id) =>
                        this.handleSelectedAddress(payload, id)
                      }
                    />
                  )}
                </Fragment>
              }
            </View>
            <View style={{ marginBottom: 20 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 15 }}> Select Project status</Text>
              </View>
              <View style={[styles.inputStyle, styles.picker, { paddingBottom: 15 }]}>
                <Picker
                  style={[styles.picker]}
                  selectedValue={status}
                  onValueChange={stat => this.setState({ status: stat })}
                >
                  {projectStatus.map((s, i) => (
                    <Picker.Item
                      key={i}
                      style={[styles.inputStyle, styles.picker]}
                      label={s}
                      value={s}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={{ marginBottom: 20 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={{ fontSize: 15 }}> Select Project Tag</Text>
              </View>
              <View style={[styles.inputStyle, styles.picker, { paddingBottom: 15 }]}>
                <Picker
                  style={[styles.picker]}
                  selectedValue={tag}
                  onValueChange={t => this.setState({ tag: t })}
                >
                  {tags.map((s, i) => (
                    <Picker.Item
                      key={i}
                      style={[styles.inputStyle, styles.picker]}
                      label={s}
                      value={s}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View>
              <Button
                text="Find Projects"
                textSize={20}
                color={YELLOW}
                medium
                textColor={WHITE}
                style={styles.inputStyle}
                fn={() => this.props.navigation.navigate('ViewProject')}
              />
            </View>
          </View>
          <View style={{ flex: 5, alignItems: 'center' }}>
            <View style={{ marginVertical: isAndroid ? '6%' : 20 }}>
              <Text style={{ fontSize: 15, fontWeight: '500' }}>Featured Projects</Text>
            </View>
            <View style={ExtStyle.flex1}>
              {loading === true ? (
                <Spinner />
              ) : (
                <Fragment>
                  {projects && projects.length === 0 ? (
                    <View style={[ExtStyle.center, { paddingTop: '2%' }]}>
                      <Text style={{ fontSize: 15 }}> No project at the moment </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={projects || []}
                      renderItem={renderItem}
                      style={ExtStyle.flex1}
                      keyExtractor={keyExtractor}
                      initialNumToRender={10}
                      onEndReachedThreshold={0.01}
                      onEndReached={this.loadMore}
                      // onEndReachedThreshold={0.1}
                    />
                  )}
                </Fragment>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

export default connect(mapStateToProps)(ExploreProject);
