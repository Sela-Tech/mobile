import React, { Component, Fragment } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  // NetInfo,
  Picker,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'native-base';

import io from 'socket.io-client';
import { store } from '../../store';
import { getNewNotifications } from '../../actions/notifications';
import { getUserProject, getContractorProject, getEvaluatorProject } from '../../actions/project';
import ParentHeader from '../components/Header';
import Text from '../components/Text';
import Proposals from '../components/Project/Proposals';
import ContractorProject from '../components/Project/ContractorProject';
import SingularProject from '../components/Project/Project';
import { YELLOW, BASE_URL } from '../utils/constants';
import ExtStyle from '../utils/styles';
import Spinner from '../components/Spinner';
import StandardText from '../components/StandardText';
import NavigationService from '../services/NavigationService';

const { height, width } = Dimensions.get('window');
const otherFilters = ['Bookmarked project', 'Project that may Interest you'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    marginTop: '40%',
    alignItems: 'center',
  },
  otherContainer: {
    alignItems: 'center',
    margin: 15,
  },
  floatingButton: {
    backgroundColor: YELLOW,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: 'flex-end',
    // flex: 1,
    position: 'absolute',
    bottom: 35,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
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

const getCurrentState = () => {
  const globalState = store.getState();

  const socket = io(BASE_URL, {
    secure: true,
    transports: ['websocket'],
  });

  socket.on('connect', data => {
    console.log(data);
  });

  socket.on('notifications', notification => {
    const { notifications } = notification;
    if (notifications.message !== 'You currently have no new notifications') {
      store.dispatch(getNewNotifications({ notifications }));
    }
  });

  socket.on('connected', userData => {
    const data = {
      userId: globalState.userInfo.user.id,
      socketId: userData.user,
    };
    socket.emit('user', data);
  });

  socket.on('ping', data => {
    console.log('status', data);
  });
};

class Project extends Component {
  state = {
    reloading: false,
    loading: true,
    relevantProject: otherFilters,
    relevantProjectVal: '',
    isFunder: this.props && this.props.userInfo && this.props.userInfo.user.isFunder,
    isEvaluator: this.props && this.props.userInfo && this.props.userInfo.user.isEvaluator,
    isContractor: this.props && this.props.userInfo && this.props.userInfo.user.isContractor,
  };

  async componentDidMount() {
    const userRoleObj = {
      isFunder: this.props && this.props.userInfo && this.props.userInfo.user.isFunder,
      isEvaluator: this.props && this.props.userInfo && this.props.userInfo.user.isEvaluator,
      isContractor: this.props && this.props.userInfo && this.props.userInfo.user.isContractor,
    };
    let userRole;
    if (userRoleObj.isFunder) {
      userRole = 'funder';
    } else if (userRoleObj.isContractor) {
      userRole = 'contractor';
    } else {
      userRole = 'evaluator';
    }

    if (userRole === 'funder') {
      await this.props.getFunderProjects();
    } else if (userRole === 'contractor') {
      await this.props.getEvaluatorProjects();
    } else {
      await this.props.getEvaluatorProjects();
    }
    // await this.props.getContractorProjects();
    this.setState({ loading: false });
    // getCurrentState();
  }

  reload = async () => {
    this.setState({ reloading: true });
    // await Promise.all([this.props.getFunderProjects()]);
    this.setState({ reloading: false });
  };

  renderButton() {
    <View style={styles.floatingButton}>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ExploreProject')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={require('../../assets/plus.png')} />
      </TouchableOpacity>
    </View>;
  }

  render() {
    const {
      relevantProject,
      relevantProjectVal,
      isFunder,
      reloading,
      isEvaluator,
      isContractor,
      loading,
    } = this.state;
    const userRoleObj = {
      isFunder,
      isEvaluator,
      isContractor,
    };
    let userRole;
    if (userRoleObj.isFunder) {
      userRole = 'funder';
    } else if (userRoleObj.isContractor) {
      userRole = 'contractor';
    } else {
      userRole = 'evaluator';
    }
    let evalProjects;
    if (userRole === 'evaluator') {
      evalProjects = (this.props && this.props.projects && this.props.projects.projects) || [];
    }
    if (userRole === 'contractor') {
      evalProjects = (this.props && this.props.projects && this.props.projects.projects) || [];
    }
    const userData = this.props && this.props.userInfo && this.props.userInfo.user;
    const projects =
      (this.props &&
        this.props.projects &&
        this.props.projects.projects &&
        this.props.projects.projects.projects) ||
      [];

    const contractorProjects =
      (this.props && this.props.projects && this.props.projects.contrProjects) || [];

    const notifications =
      this.props && this.props.notifications && this.props.notifications.notifications;

    const newNotifs =
      notifications === undefined
        ? []
        : notifications &&
          notifications.notifications &&
          notifications.notifications.filter(c => c.read === false);

    const projectCreatedByMe = projects && projects.filter(c => c.owner._id === userData.id);

    return (
      <View style={styles.container}>
        <ParentHeader
          headerName="PROJECTS"
          sideIconStatus
          sideIconImage={
            newNotifs === undefined
              ? require('../../assets/emptyBell.png')
              : newNotifs && newNotifs.length === 0
              ? require('../../assets/new_bell.png')
              : require('../../assets/notifications-received.png')
          }
        />
        <ScrollView
          contentContainerstyle={{ flexGrow: 1 }}
          refreshControl={<RefreshControl refreshing={reloading} onRefresh={this.reload} />}
        >
          <Fragment>
            {loading ? (
              <View style={{ height }}>
                <Spinner />
              </View>
            ) : (
              <Fragment>
                {userRole === 'funder' ? (
                  <ScrollView contentContainerstyle={{ flexGrow: 1 }}>
                    <StandardText
                      text="Welcome back"
                      viewStyle={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginLeft: 10,
                        marginTop: 10,
                      }}
                      textStyle={{
                        fontSize: 18,
                        color: '#201D41',
                      }}
                    />

                    <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                      <View style={{ marginBottom: 5 }}>
                        <Text style={{ fontSize: 15 }}> FilterBy</Text>
                      </View>
                      <View style={[styles.inputStyle, styles.picker, { paddingBottom: 15 }]}>
                        <Picker
                          style={[styles.picker]}
                          selectedValue={relevantProjectVal}
                          onValueChange={t => this.setState({ relevantProjectVal: t })}
                        >
                          {relevantProject.map((s, i) => (
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

                    <View style={ExtStyle.flex1}>
                      <ContractorProject
                        leftText="Projects you fund"
                        // rightText="See all"
                        projects={projects}
                      />
                    </View>

                    {/* <View style={ExtStyle.flex1}>
                      <SingularProject
                        leftText="Projects you initiated"
                        // rightText="See all"
                        projects={projectCreatedByMe}
                      />
                    </View>

                    <View style={ExtStyle.flex1}>
                      <SingularProject
                        leftText="Projects that may interest you"
                        // rightText="Edit interest"
                        projects={projects}
                      />
                    </View>

                    <View style={ExtStyle.flex1}>
                      <SingularProject
                        leftText="Bookmarks"
                        // rightText="See all"
                        projects={projects}
                      />
                    </View> */}
                  </ScrollView>
                ) : (
                  <Fragment>
                    {userRole === 'contractor' ? (
                      <Tabs
                        locked
                        tabBarUnderlineStyle={{
                          backgroundColor: '#201D41',
                        }}
                      >
                        <Tab
                          heading="Your Projects"
                          textStyle={{ color: '#B1BAD2', fontSize: 14 }}
                          activeTextStyle={{ color: '#fff', fontSize: 14 }}
                          activeTabStyle={{
                            backgroundColor: '#201D41',
                          }}
                          tabStyle={{ backgroundColor: '#FFFFFF' }}
                        >
                          <View style={{ marginTop: 10, marginHorizontal: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                              <Text style={{ fontSize: 15 }}> FilterBy</Text>
                            </View>
                            <View style={[styles.inputStyle, styles.picker, { paddingBottom: 15 }]}>
                              <Picker
                                style={[styles.picker]}
                                selectedValue={relevantProjectVal}
                                onValueChange={t => this.setState({ relevantProjectVal: t })}
                              >
                                {relevantProject.map((s, i) => (
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

                          <ContractorProject projects={evalProjects} />
                        </Tab>
                        <Tab
                          heading="Your Proposals"
                          textStyle={{ color: '#B1BAD2', fontSize: 14 }}
                          activeTextStyle={{ color: '#fff', fontSize: 14 }}
                          activeTabStyle={{ backgroundColor: '#201D41' }}
                          tabStyle={{ backgroundColor: '#FFFFFF' }}
                        >
                          <Proposals projects={evalProjects} />
                        </Tab>
                      </Tabs>
                    ) : (
                      <ScrollView style={{ flex: 1 }} contentContainerstyle={{ flexGrow: 1 }}>
                        {evalProjects.length === 0 ? (
                          <View style={styles.subContainer}>
                            <View>
                              <Image source={require('../../assets/Illustration.png')} />
                            </View>
                            <View style={styles.otherContainer}>
                              <Text style={styles.emptyText}> You haven't been </Text>
                              <Text style={styles.emptyText}> added to any project yet. </Text>
                            </View>
                          </View>
                        ) : (
                          <View>
                            <View style={ExtStyle.flex1}>
                              <ContractorProject
                                leftText="Projects you evaluate"
                                // rightText="See all"
                                projects={evalProjects}
                              />
                            </View>
                            <View style={ExtStyle.flex1}>{this.renderButton()}</View>
                          </View>
                        )}
                      </ScrollView>
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        </ScrollView>
        <Fragment>
          {userRole !== 'evaluator' ? (
            <TouchableOpacity
              onPress={() => NavigationService.navigate('CreateProject')}
              style={styles.floatingButton}
            >
              <Image source={require('../../assets/plus.png')} />
            </TouchableOpacity>
          ) : null}
        </Fragment>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  getFunderProjects: () => dispatch(getUserProject()),
  getEvaluatorProjects: () => dispatch(getEvaluatorProject()),
  getContractorProjects: () => dispatch(getContractorProject()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Project);

// Contractor View
{
  /* <Tabs
                            tabBarUnderlineStyle={{
                              backgroundColor: '#201D41',
                            }}
                          >
                            <Tab
                              heading="Your Projects"
                              textStyle={{ color: '#B1BAD2', fontSize: 14 }}
                              activeTextStyle={{ color: '#fff', fontSize: 14 }}
                              activeTabStyle={{
                                backgroundColor: '#201D41',
                              }}
                              tabStyle={{ backgroundColor: '#FFFFFF' }}
                            >
                              <ContractorProject projects={projects} />
                            </Tab>
                            <Tab
                              heading="Your Proposals"
                              textStyle={{ color: '#B1BAD2', fontSize: 14 }}
                              activeTextStyle={{ color: '#fff', fontSize: 14 }}
                              activeTabStyle={{ backgroundColor: '#201D41' }}
                              tabStyle={{ backgroundColor: '#FFFFFF' }}
                            >
                              <Proposals projects={projects} />
                            </Tab>
                          </Tabs> */
}
