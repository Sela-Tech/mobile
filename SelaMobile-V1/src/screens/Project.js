import React, { Component, Fragment } from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  // NetInfo,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
// import { Tabs, Tab } from 'native-base';

import io from 'socket.io-client';
import { store } from '../../store';
import { getNewNotifications } from '../../actions/notifications';
import { getUserProject, getContractorProject } from '../../actions/project';
import ParentHeader from '../components/Header';
import ContractorProject from '../components/Project/ContractorProject';
import SingularProject from '../components/Project/Project';
import { YELLOW, BASE_URL } from '../utils/constants';
import ExtStyle from '../utils/styles';
import Spinner from '../components/Spinner';
import StandardText from '../components/StandardText';
import NavigationService from '../services/NavigationService';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    justifyContent: 'center',
    flex: 8,
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
    isFunder: this.props && this.props.userInfo && this.props.userInfo.user.isFunder,
    isEvaluator: this.props && this.props.userInfo && this.props.userInfo.user.isFunder,
    isContractor: this.props && this.props.userInfo && this.props.userInfo.user.isContractor,
  };

  async componentDidMount() {
    await this.props.getFunderProjects();
    // await this.props.getContractorProjects();
    this.setState({ loading: false });
    // getCurrentState();
  }

  reload = async () => {
    this.setState({ reloading: true });
    await Promise.all([this.props.getFunderProjects()]);
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
    const { isFunder, reloading, isEvaluator, isContractor, loading } = this.state;
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

                    <View style={ExtStyle.flex1}>
                      <SingularProject
                        leftText="Projects you fund"
                        // rightText="See all"
                        projects={projects}
                      />
                    </View>

                    <View style={ExtStyle.flex1}>
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
                    </View>
                  </ScrollView>
                ) : (
                  <Fragment>
                    {userRole === 'contractor' ? (
                      <ContractorProject projects={projects} />
                    ) : (
                      <ScrollView contentContainerstyle={{ flexGrow: 1 }}>
                        <View>
                          <View style={ExtStyle.flex1}>
                            <SingularProject
                              leftText="Projects you evaluate"
                              // rightText="See all"
                              projects={projects}
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
                          </View>
                          <View style={ExtStyle.flex1}>{this.renderButton()}</View>
                        </View>
                      </ScrollView>
                    )}
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        </ScrollView>
        <TouchableOpacity
          onPress={() => NavigationService.navigate('CreateProject')}
          style={styles.floatingButton}
        >
          <Image source={require('../../assets/plus.png')} />
        </TouchableOpacity>
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
