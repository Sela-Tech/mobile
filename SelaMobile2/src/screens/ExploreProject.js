import React, { Component, Fragment } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import Header from '../components/ExploreTopTabs/Header';
import Navigator from './ExploreTabs/Navigator';
import { getSingleProject } from '../utils/api';
import ExtStyle from '../utils/styles';


const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageHeight: {
    height: height / 3.5,
  },
});
class ExploreProject extends Component {
  state = {
    projectId: this.props.navigation.state.params,
    loading: true,
    notAvailaible: false,
  };
  async componentDidMount() {
    try {
      const { projectId } = this.state;
      const allProjects =
        this.props &&
        this.props.projects &&
        this.props.projects.projects &&
        this.props.projects.projects.projects;
      if (allProjects.length === 0) {
        const resp = await getSingleProject(projectId);
        this.setState({
          projectInfo: resp.data,
          loading: false,
          notAvailaible: true
        });
      }
      else {
        const status = allProjects && allProjects.includes(this.state.projectId);
        if (!status) {
          const resp = await getSingleProject(projectId);
          this.setState({
            projectInfo: resp.data,
            loading: false,
            notAvailaible: true,
          });
        }
        else {
          this.setState({ loading: false })
        }
      }
    }
    catch (err) {
      this.setState({ error: err.message })
    }
  }

  render() {
    const { projectId, loading, notAvailaible, projectInfo } = this.state;
    const allProjects =
      this.props &&
      this.props.projects &&
      this.props.projects.projects &&
      this.props.projects.projects.projects;

    let theProject = allProjects.filter(c => c._id === projectId);
    theProject = theProject[0];

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
          {
            !!notAvailaible ?
              (
                <Fragment>
                  <View>
                    <Image style={styles.imageHeight} source={{ uri: projectInfo['project-avatar'] === undefined ? 'https://placeimg.com/640/480/any' : projectInfo['project-avatar'] }} />
                  </View>
                  <View style={ExtStyle.flex3}>
                    <Header
                      projectLocationText={projectInfo.location.name}
                      projectStatusText={projectInfo.status}
                      projectNameText="MARKERS LTD"
                      projectTitleText={projectInfo.name}
                      budgetAmount={projectInfo.goal}
                      numberOfStakeholders={projectInfo.stakeholders.length}
                      raisedAmount={projectInfo.raised}
                      tags={projectInfo.tags}
                    />
                  </View>
                  <View style={ExtStyle.flex6}>
                    <Navigator project={projectInfo} />
                  </View>
                </Fragment>
              ) :
              (
                <Fragment>
                  <View>
                    <Image style={styles.imageHeight} source={{ uri: theProject['project-avatar'] }} />
                  </View>
                  <View style={styles.flex3}>
                    <Header
                      projectLocationText={theProject && theProject.location.name}
                      projectStatusText={theProject.status}
                      projectNameText="MARKERS LTD"
                      projectTitleText={theProject.name}
                      budgetAmount={theProject.goal}
                      numberOfStakeholders={theProject.stakeholders.length}
                      raisedAmount={theProject.raised}
                      tags={theProject.tags}
                    />
                  </View>
                  <View style={ExtStyle.flex6}>
                    <Navigator project={theProject} />
                  </View>
                </Fragment>
              )
          }
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
