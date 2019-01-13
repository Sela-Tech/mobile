import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { getUserProject } from '../../actions/project';
import Header from '../components/Header';
import Text from '../components/Text';
import SingularProject from '../components/Project/Project';
import Button from '../components/Button';
import { YELLOW, WHITE } from '../utils/constants';
import Spinner from '../components/Spinner';

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
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: height / 7,
    right: 30,
  },
});

class Project extends Component {
  state = {
    loading: true,
    empty: true,
    isFunder: this.props && this.props.userInfo && this.props.userInfo.user.isFunder,
    isEvaluator: this.props && this.props.userInfo && this.props.userInfo.user.isFunder,
    isContractor: this.props && this.props.userInfo && this.props.userInfo.user.isContractor,
  };

  async componentDidMount() {
    // console.log('thth', this.props.userInfo)
    await this.props.getProjects();
    this.setState({ loading: false })

  }

  render() {
    const {
      isFunder,
      isEvaluator,
      isContractor,
      empty,
      loading,
    } = this.state;
    const userRoleObj = {
      isFunder,
      isEvaluator,
      isContractor,
    };
    let userRole;
    if (userRoleObj.isFunder) {
      userRole = 'funder'
    }
    else if (!!userRoleObj.isContractor) {
      userRole = 'contractor';
    }
    else {
      userRole = 'evaluator';
    }
    const userData = this.props && this.props.userInfo && this.props.userInfo.user;
    const projects = this.props && this.props.projects && this.props.projects.projects && this.props.projects.projects.projects;

    const projectCreatedByMe = projects && projects.filter(c => c.owner._id === userData.id);

    if (loading) {
      return <Spinner />
    }
    return (
      <View style={styles.container}>
        <Header
          headerName="PROJECTS"
          sideIconStatus
          sideIconImage={require('../../assets/emptyBell.png')}
        />
        <Fragment>
          {
            userRole === 'funder' ? (

              <ScrollView contentContainerstyle={{ flexGrow: 1 }}>
                <View>
                  <View style={{ flex: 1 }}>
                    <SingularProject
                      leftText="Projects you created"
                      rightText="See all"
                      projects={projectCreatedByMe}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <SingularProject
                      leftText="Projects you funded"
                      rightText="See all"
                      projects={projects}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <SingularProject
                      leftText="Projects that may interest you"
                      rightText="Edit interest"
                      projects={projects}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <SingularProject
                      leftText="Save Project"
                      rightText="See all"
                      project={projects}
                    />
                  </View>
                </View>

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
                </View>

              </ScrollView>
            ) :
              (
                <View style={styles.subContainer}>
                  <View>
                    <Image source={require('../../assets/Illustration.png')} />
                  </View>
                  <View style={styles.otherContainer}>
                    <View style={styles.otherContainer}>
                      {
                        userRole === 'funder' ?
                          (
                            <Fragment>
                              <Text> You haven't created, funded, or saved any </Text>
                              <Text> projects yet. </Text>
                            </Fragment>
                          ) : userRole === 'contractor' ?
                            (
                              <Fragment>
                                <Text> You haven't propose or been </Text>
                                <Text> added to any projects yet. </Text>
                              </Fragment>
                            ) :
                            (
                              <Fragment>
                                <Text> You haven't evaluated or  </Text>
                                <Text> saved any projects yet. </Text>
                              </Fragment>
                            )
                      }

                    </View>
                    <View>
                      <Button
                        text="Explore Project"
                        color={userRole === 'funder' ? WHITE : YELLOW}
                        textColor={userRole === 'funder' ? '#201D41' : WHITE}
                        style={{
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: '#B1BAD2',
                        }}
                        fn={() => this.props.navigation.navigate('ExploreProject')}
                      />
                      <Fragment>
                        {
                          userRole === 'funder' ?
                            <View style={{ paddingTop: 15 }}>
                              <Button
                                text="Create new project"
                                color={YELLOW}
                                textColor={WHITE}
                                fn={() => this.props.navigation.navigate('CreateProject')}
                              />
                            </View> : null
                        }

                      </Fragment>
                    </View>
                  </View>
                </View>
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

const mapDispatchToProps = dispatch => ({
  getProjects: () => dispatch(getUserProject()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Project);
