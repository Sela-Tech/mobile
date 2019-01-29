import React, { Component, Fragment } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ExtStyle from '../utils/styles';
import { getUserDetails } from '../utils/api';
import Spinner from '../components/Spinner';
import B from '../components/BoldText';
import Box from '../components/Project/Box';
import Header from '../components/Header';
import Project from '../components/ExploreProject/Project';
import UserId from '../components/Profile/UserId';
import UserInfo from '../components/Profile/UserInfo';
import Tag from '../components/Tag';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    marginTop: '5%',
  },
});

const images = [
  {
    source: require('../../assets/oilspill.png'),
    id: 1,
    test: 'Idejo Classroom Blocks Construction',
  },
  {
    source: require('../../assets/road.png'),
    id: 2,
    test: 'Idejo Classroom Blocks Construction',
  },
  {
    source: require('../../assets/borehole.png'),
    id: 3,
    test: 'Idejo Classroom Blocks Construction',
  },
  {
    source: require('../../assets/road.png'),
    id: 4,
    test: 'Idejo Classroom Blocks Construction',
  },
  {
    source: require('../../assets/borehole.png'),
    id: 5,
    test: 'Idejo Classroom Blocks Construction',
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
      try {
        const resp = await getUserDetails({ id: '5c4ed79ae7c138002227764f' });
        console.log('resp.', resp.data);
        this.setState({ profileInfo: resp.data, loading: false, guestUser: true });
      } catch (err) {
        this.setState({ error: err.message, loading: false });
      }
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, profileInfo, guestUser } = this.state;
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
      <ScrollView contentContainerStyle={styles.container}>
        <Header headerName="PROFILE" />
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
                    <View style={{ marginHorizontal: 15 }}>
                      <Box empty fn={() => console.log('navigate')} />
                    </View>
                  ) : (
                    <FlatList
                      style={{ paddingTop: 10 }}
                      data={projects || images}
                      keyExtractor={keyExtractor}
                      horizontal
                      renderItem={renderItem}
                    />
                  )}
                </Fragment>
              </View>
              <View>
                <View style={{ marginVertical: 15, marginLeft: 10 }}>
                  <B color="#201D41"> Interests </B>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Tag viewColor="#1ECD97" text="Education" />

                  <Tag viewColor="#1ECD97" text="Education" />
                </View>
              </View>
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
