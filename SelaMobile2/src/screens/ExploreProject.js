import React, { Component, Fragment } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import Text from '../components/Text';
import Header from '../components/ExploreTopTabs/Header';
import Navigator from './ExploreTabs/Navigator';
import { getSingleProject } from '../utils/api';
import ExtStyle from '../utils/styles';
import { WHITE } from '../utils/constants';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  imageHeight: {
    height: height / 3.5,
  },
  mt3: {
    marginTop: height < 600 ? 3 : null,
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
          {notAvailaible ? (
            <Fragment>
              <View style={{ flex: 4, marginBottom: 5 }}>
                <View>
                  <Image
                    style={styles.imageHeight}
                    // resizeMode="contain"
                    source={require('../../assets/img/cleanup/water.jpg')}
                    // source={{
                    //   uri:
                    //     projectInfo['project-avatar'] === undefined
                    //       ? 'https://placeimg.com/640/480/any'
                    //       : projectInfo['project-avatar'],
                    // }}
                  />
                </View>
                <View
                  style={{
                    position: 'absolute',
                    top: 12,
                    bottom: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <TouchableOpacity
                    transparent
                    style={{
                      marginTop: '7%',
                      marginHorizontal: '5%',
                      flexDirection: 'row',
                    }}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <View>
                      <Image source={require('../../assets/white-back.png')} />
                    </View>
                    <View>
                      <Text style={{ color: WHITE, fontSize: 15 }}> Back to Explore </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[ExtStyle.flex3, styles.mt3]}>
                <Header
                  projectLocationText={projectInfo.location.name}
                  projectStatusText={projectInfo.status}
                  projectNameText="MARKERS LTD"
                  projectTitleText={projectInfo.name}
                  budgetAmount="$2,000,000" // {projectInfo.goal}
                  numberOfStakeholders={projectInfo.stakeholders.length}
                  raisedAmount={projectInfo.raised}
                  tags={projectInfo.tags}
                />
              </View>
              <View style={ExtStyle.flex6}>
                <Navigator
navigation={this.props.navigation} project={projectInfo} />
              </View>
            </Fragment>
          ) : (
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
