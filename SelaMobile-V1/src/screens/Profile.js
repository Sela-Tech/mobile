import React, { Component, Fragment } from 'react';
import { View, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ExtStyle from '../utils/styles';
import { getUserDetails } from '../utils/api';
import Spinner from '../components/Spinner';
import B from '../components/BoldText';
import Text from '../components/Text';
import Header from '../components/Header';
import Project from '../components/ExploreProject/Project';
import UserId from '../components/Profile/UserId';
import UserInfo from '../components/Profile/UserInfo';
import Tag from '../components/Explore/ClTag';
import { tagsColor, mapNameToTag } from '../utils/helpers';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    flexGrow: 1,
  },
  subContainer: {
    marginTop: '5%',
  },
  interestTag: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginLeft: 5,
    marginBottom: 10,
  },
  interestSubContainer: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
  emptyBox: {
    height: height / 10,
    paddingTop: '5%',
    alignItems: 'center',
  },
  textInEmptyBox: {
    fontSize: 15,
    fontWeight: '300',
  },
});

const images = [
  {
    source: require('../../assets/img/cleanup/cleanup_3.jpg'),
    id: 1,
    test: 'Bodo oil ceanup',
  },
  {
    source: require('../../assets/img/cleanup/factory_2.jpg'),
    id: 2,
    test: 'ABA factory construction',
  },
  {
    source: require('../../assets/img/cleanup/cleanup_4.jpg'),
    id: 3,
    test: 'k-DereII oil-cleanup',
  },
  {
    source: require('../../assets/img/cleanup/cleanup_22.jpg'),
    id: 4,
    test: 'B-DereII oil-cleanup',
  },
  {
    source: require('../../assets/borehole.png'),
    id: 5,
    test: 'k-dere oil cleanup',
  },
];

const keyExtractor = item => item.id.toString();

const renderItem = item => <Project imgSource={item.item.source} test={item.item.test} />;

class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  state = {
    loading: true,
  };

  async componentDidMount() {
    if (Object.keys(this.props.navigation.state).length !== 2) {
      const info = this.props.navigation.state.params;
      try {
        const resp = await getUserDetails({ id: this.props.navigation.state.params });
        this.setState({
          profileInfo: resp.data,
          interests: resp.data.userInfo.areasOfInterest,
          loading: false,
          guestUser: true,
        });
      } catch (err) {
        this.setState({ error: err.message, loading: false });
      }
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, profileInfo, guestUser, interests } = this.state;
    let userType;
    let userName;
    let projects;
    let verificationStatus = 'Not Verified';
    if (guestUser) {
      const {
        isFunder,
        isContractor,
        // isEvaluator,
        firstName,
        lastName,
        isVerified,
      } = profileInfo.userInfo;
      projects = profileInfo.projects;
      if (isVerified) {
        verificationStatus = 'Verified';
      }

      userName = firstName.concat(' ').concat(lastName);
      if (isFunder === true) {
        userType = 'Funder';
      } else if (isContractor === true) {
        userType = 'Contractor';
      } else {
        userType = 'Evaluation agent';
      }
    }

    return (
      <ScrollView stickyHeaderIndices={[0]} contentContainerStyle={styles.container}>
        <Header justBack navigation={this.props.navigation} headerName="PROFILE" />
        <Fragment>
          {loading ? (
            <View style={ExtStyle.center}>
              <Spinner />
            </View>
          ) : (
            <View style={styles.subContainer}>
              <UserId
                userType={guestUser ? userType : 'Funder'}
                userName={guestUser ? userName : 'Eze'}
                verificationStatus={verificationStatus}
              />
              <UserInfo
                reputationScore={guestUser ? profileInfo.userInfo.reputationScore : '0'}
                projects={guestUser ? profileInfo && profileInfo.projects.length : '0'}
                dataUploads={guestUser ? profileInfo.uploads : '0'}
                location={guestUser ? 'Lagos,Nigeria.' : 'Lagos,Nigeria.'}
              />
              <View style={{ marginVertical: 10 }}>
                <View style={{ marginVertical: 15, marginLeft: 10 }}>
                  <B color="#201D41"> Other projects with Ade </B>
                </View>
                <Fragment>
                  {projects && projects.length === 0 ? (
                    <View style={styles.emptyBox}>
                      <Text style={styles.textInEmptyBox}>
                        {' '}
                        You haven't been added to any project yet.
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      keyExtractor={(item, index) => index.toString()}
                      style={{ paddingTop: 10 }}
                      data={images}
                      keyExtractor={keyExtractor}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      renderItem={renderItem}
                    />
                  )}
                </Fragment>
              </View>
              <Fragment>
                {interests.length === 0 ? (
                  <View />
                ) : (
                  <View style={{ marginLeft: 10 }}>
                    <View style={{ marginVertical: 15 }}>
                      <B color="#201D41"> Interests </B>
                    </View>
                    <View style={styles.interestTag}>
                      {interests.map((c, index) => (
                        <View key={index} style={styles.interestSubContainer}>
                          <Tag showTag={console.log()} src={mapNameToTag(c)} />
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </Fragment>
            </View>
          )}
        </Fragment>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

export default connect(mapStateToProps)(Profile);
