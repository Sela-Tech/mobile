import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import Navigator from './ExploreTabs/Navigator';
import Text from '../components/Text';
import Button from '../components/Button';
import Imagen from '../components/ProgressiveImage';
import NavigationService from '../services/NavigationService';
import { getSingleProject } from '../utils/api';
import ExtStyle from '../utils/styles';
import { WHITE } from '../utils/constants';
import { getUserRole } from '../utils/helpers';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.flatten({
  contentView: {
    flex: 1,
    marginVertical: 20,
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  imageHeight: {
    height,
  },
  bottomButton: {
    view: {
      width: width / 3.5,
      height: height / 15,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
    },
  },
  imagePosition: {
    position: 'absolute',
    top: 12,
    bottom: 0,
    left: 5,
    right: 0,
  },
  buttonPosition: {
    position: 'absolute',
    top: height / 8,
    bottom: 0,
    left: 20,
    right: 0,
  },

  flex4mb5: {
    flex: 4,
    // marginBottom: 1,
  },
  backButton: {
    marginTop: '7%',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  backButtonText: {
    color: WHITE,
    fontSize: 15,
  },
});
class ExploreProject extends Component {
  state = {
    projectId: this.props.navigation.state.params,
    loading: true,
    requests: [],
    notAvailaible: false,
  };

  async componentDidMount() {
    this._isMounted = true;
    await this.getProjectToDisplay();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getProjectToDisplay = async () => {
    try {
      const { projectId } = this.state;
      const allProjects = this.props && this.props.projects && this.props.projects.projects;
      const getProject = allProjects && allProjects.filter(c => c._id === projectId);
      if ((allProjects && allProjects.length === 0) || (getProject && getProject.length === 0)) {
        const resp = await getSingleProject(projectId);
        this.setState({
          projectInfo: resp.data,
          loading: false,
          notAvailaible: true,
        });
      } else {
        this.setState({
          projectInfo: getProject[0],
          loading: false,
          notAvailaible: true,
        });
      }
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  // Update task after submitting evidence request
  updateTask = id => {
    const { requests } = this.state;
    const cc = requests.map(c => {
      if (c._id === id) {
        c.status = 'Completed';
        return c;
      }
      return c;
    });
    this.setState({ requests: cc });
  };

  render() {
    const { projectId, loading, notAvailaible, projectInfo } = this.state;
    const { navigation } = this.props;

    const { isFunder, isEvaluator, isContractor } =
      this.props && this.props.userInfo && this.props.userInfo.user;
    const userRoleObj = {
      isFunder,
      isEvaluator,
      isContractor,
    };

    const userRole = getUserRole(userRoleObj);

    const userId =
      this.props && this.props.userInfo && this.props.userInfo.user && this.props.userInfo.user.id;
    const projectStakeholders = projectInfo && projectInfo.stakeholders;

    // Check if user is part of the stakeholders
    const userStakeholderStatus =
      projectStakeholders &&
      projectStakeholders.filter(
        c => c & c.user && c.user.information && c.user.information._id === userId,
      );

    if (loading) {
      return (
        <View style={ExtStyle.center}>
          <LottieView source={require('../../assets/animations/loading.json')} autoPlay loop />
        </View>
      );
    }
    return (
      <View style={ExtStyle.flex1}>
        <Fragment>
          {notAvailaible ? (
            <Fragment>
              <View style={ExtStyle.flex3}>
                <View style={ExtStyle.flex1}>
                  <Imagen
                    imageStyle={styles.imageStyle}
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                    }}
                    source={{
                      uri:
                        (projectInfo && projectInfo['project-avatar']) ||
                        (projectInfo && projectInfo.avatar),
                    }}
                  />
                </View>
                <View style={styles.imagePosition}>
                  <TouchableOpacity
                    transparent
                    style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <View>
                      <Image source={require('../../assets/white-back.png')} />
                    </View>
                    <View>
                      <Text style={styles.backButtonText}> Back </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Fragment>
                  {userRole !== 'evaluators' ? null : (
                    <View style={styles.buttonPosition}>
                      <Button
                        fn={() =>
                          userRole !== 'evaluator'
                            ? NavigationService.navigate('AddProposal', {
                                projectId: projectInfo && projectInfo._id,
                                userId,
                              })
                            : console.log('')
                        }
                        style={styles.bottomButton.view}
                        textStyle={styles.bottomButton.text}
                        text={userRole !== 'evaluator' ? 'Send Proposal' : 'Request to Join'}
                        textColor={WHITE}
                      />
                    </View>
                  )}
                </Fragment>
              </View>
              <View style={ExtStyle.flex6}>
                <Navigator
                  navigation={navigation}
                  project={projectInfo}
                  userId={userId}
                  updateTask={this.updateTask}
                />
              </View>
            </Fragment>
          ) : (
            <View />
          )}
        </Fragment>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

export default connect(mapStateToProps)(ExploreProject);
