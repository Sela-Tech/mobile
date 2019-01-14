import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/ExploreTopTabs/Header';
import Navigator from './ExploreTabs/Navigator';

class ExploreProject extends Component {
  state = {
    projectId: this.props.navigation.state.params
  }

  render() {
    const { projectId } = this.state;
    const allProjects =
      this.props &&
      this.props.projects &&
      this.props.projects.projects &&
      this.props.projects.projects.projects;

    let theProject = allProjects.filter(c => c._id === projectId);
    theProject = theProject[0];
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Image style={{ height: 200 }} source={{ uri: theProject['project-avatar'] }} />
        </View>
        <View style={{ flex: 3 }}>
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
        <View style={{ flex: 6 }}>
          <Navigator
            project={theProject}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

export default connect(mapStateToProps)(ExploreProject);
