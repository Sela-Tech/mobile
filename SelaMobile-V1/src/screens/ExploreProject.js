import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Navigator from './ExploreTabs/Navigator';
import Spinner from '../components/Spinner';
import Text from '../components/Text';
import Button from '../components/Button';
import Header from '../components/Explore/Header';
// import ExpandableBox from '../components/Explore/ExpandableBox';
import FunderView from '../components/Explore/FunderView';
import ContractorView from '../components/Explore/ContractorView';
import EvaluatorView from '../components/Explore/EvaluatorView';
import NavigationService from '../services/NavigationService';
import { getSingleProject, retrieveEvidenceRequest } from '../utils/api';
import ExtStyle from '../utils/styles';
import { WHITE } from '../utils/constants';

import { getDummyDisplayPicture } from '../utils/helpers';

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
  mt3: {
    // marginTop: height < 600 ? 3 : null,
  },
  imagePosition: {
    position: 'absolute',
    top: 12,
    bottom: 0,
    left: 0,
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
    notAvailaible: false,
    expandAnalyticsBox: true,
    expandOverviewBox: true,
    expandTransactionsBox: true,
    expandUpdatesBox: true,
    expandStakeHoldersBox: true,
    expandProposalsBox: true,
  };

  async componentDidMount() {
    try {
      const { projectId } = this.state;
      const { isFunder, isEvaluator, isContractor } =
        this.props && this.props.userInfo && this.props.userInfo.user;
      const userRoleObj = {
        isFunder,
        isEvaluator,
        isContractor,
      };
      let allProjects;

      let userRole;
      if (userRoleObj.isFunder) {
        userRole = 'funder';
      } else if (userRoleObj.isContractor) {
        userRole = 'contractor';
      } else {
        userRole = 'evaluator';
      }
      if (userRole === 'evaluator') {
        allProjects = this.props && this.props.projects && this.props.projects.projects;
      } else if (userRole === 'contractor') {
        allProjects = this.props && this.props.projects && this.props.projects.projects;
      } else {
        allProjects =
          this.props &&
          this.props.projects &&
          this.props.projects.projects &&
          this.props.projects.projects.projects;
      }
      await this.getAllEvidenceRequest();

      if (allProjects.length === 0) {
        const resp = await getSingleProject(projectId);
        this.setState({
          projectInfo: resp.data,
          loading: false,
          notAvailaible: true,
        });
      } else {
        const status = allProjects && allProjects.includes(this.state.projectId);
        if (!status) {
          const resp = await getSingleProject(projectId);
          this.setState({
            projectInfo: resp.data,
            loading: false,
            notAvailaible: true,
          });
        } else {
          this.setState({ loading: false });
        }
      }
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  getAllEvidenceRequest = async () => {
    const { projectId } = this.state;
    try {
      const resp = await retrieveEvidenceRequest(
        projectId,
        // this.props && this.props.project && this.props.project._id,
      );
      this.setState({ requests: resp.data.evidenceRequests, loading: false });
    } catch (err) {
      console.log('the ereo', err.message);
    }
  };

  expandTheBox = val => {
    if (val === 'analytics') {
      return this.setState(prevState => ({ expandAnalyticsBox: !prevState.expandAnalyticsBox }));
    }
    if (val === 'overview') {
      return this.setState(prevState => ({ expandOverviewBox: !prevState.expandOverviewBox }));
    }
    if (val === 'transaction') {
      return this.setState(prevState => ({
        expandTransactionsBox: !prevState.expandTransactionsBox,
      }));
    }
    if (val === 'updates') {
      return this.setState(prevState => ({ expandUpdatesBox: !prevState.expandUpdatesBox }));
    }
    if (val === 'stakeholders') {
      return this.setState(prevState => ({
        expandStakeHoldersBox: !prevState.expandStakeHoldersBox,
      }));
    }
    if (val === 'proposals') {
      return this.setState(prevState => ({ expandProposalsBox: !prevState.expandProposalsBox }));
    }

    this.setState(prevState => ({ expandProposalsBox: !prevState.expandProposalsBox }));
  };

  userView = (userRole, userId, navigation, projectInfo, userStakeholderStatus) => {
    switch (userRole) {
      case 'funder':
        return (
          <FunderView
            navigation={navigation}
            projectInfo={projectInfo}
            userId={userId}
            userStakeholderStatus={userStakeholderStatus}
          />
        );
      case 'contractor':
        return (
          <ContractorView
            navigation={navigation}
            projectInfo={projectInfo}
            userId={userId}
            userStakeholderStatus={userStakeholderStatus}
          />
        );
      case 'evaluator':
        return (
          <EvaluatorView
            navigation={navigation}
            projectInfo={projectInfo}
            userId={userId}
            userStakeholderStatus={userStakeholderStatus}
          />
        );
      default:
        return (
          <FunderView
            navigation={navigation}
            projectInfo={projectInfo}
            userId={userId}
            userStakeholderStatus={userStakeholderStatus}
          />
        );
    }
  };

  render() {
    const {
      projectId,
      loading,
      notAvailaible,
      projectInfo,
      requests,
      expandAnalyticsBox,
      expandOverviewBox,
      expandTransactionsBox,
      expandStakeHoldersBox,
      expandProposalsBox,
      expandUpdatesBox,
    } = this.state;
    const { navigation } = this.props;

    const { isFunder, isEvaluator, isContractor } =
      this.props && this.props.userInfo && this.props.userInfo.user;
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
    let allProjects;
    let theProject;
    const userId =
      this.props && this.props.userInfo && this.props.userInfo.user && this.props.userInfo.user.id;

    if (userRole === 'evaluator') {
      allProjects = (this.props && this.props.projects && this.props.projects.projects) || [];

      theProject = allProjects && allProjects.filter(c => c._id === projectId);
      theProject = theProject[0];
      const projectStakeholders = projectInfo && projectInfo.stakeholders;
    } else {
      allProjects =
        (this.props &&
          this.props.projects &&
          this.props.projects.projects &&
          this.props.projects.projects.projects) ||
        [];

      theProject = allProjects && allProjects.filter(c => c._id === projectId);
      theProject = theProject[0];

      const projectStakeholders = projectInfo && projectInfo.stakeholders;

      // Check if user is part of the stakeholders
      const userStakeholderStatus =
        projectStakeholders && projectStakeholders.filter(c => c.user.information._id === userId);
    }

    console.log('the project-info', projectInfo);

    if (loading) {
      return (
        <View style={ExtStyle.center}>
          <Spinner />
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
                  <Image
                    style={styles.imageStyle}
                    source={{ uri: projectInfo && projectInfo['project-avatar'] }}
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
                  navigation={this.props.navigation}
                  project={projectInfo}
                  userId={userId}
                  requests={requests}
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
