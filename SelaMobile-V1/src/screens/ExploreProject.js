import React, { Component, Fragment } from 'react';
import { View, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner';
import Text from '../components/Text';
import StandardText from '../components/StandardText';
import Tag from '../components/Tag';
import Button from '../components/Button';
import Header from '../components/Explore/Header';
import ExpandableBox from '../components/Explore/ExpandableBox';
import Navigator from './ExploreTabs/Navigator';
import { getSingleProject } from '../utils/api';
import ExtStyle from '../utils/styles';
import { getDummyDisplayPicture, projectStatusTextColor } from '../utils/helpers';
import { WHITE } from '../utils/constants';

const { height, width } = Dimensions.get('window');
const fundedStatus = ['60%', '40%', '20%', '85%'];

const styles = StyleSheet.create({
  imageHeight: {
    height,
  },
  mt3: {
    // marginTop: height < 600 ? 3 : null,
  },
  imagePosition: {
    position: 'absolute',
    top: 12,
    left: 10,
  },
  viewInImage: {
    backgroundColor: WHITE,
    width: width / 4,
    position: 'absolute',
    top: 150,
    left: 10,
    zIndex: 3,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  innerView: {
    flexDirection: 'row',
    paddingHorizontal: 3,
  },
  fundedTextColor: {
    color: '#201D41',
  },
  // tagPosition: {
  //   position: 'absolute',
  //   bottom: 60,
  //   left: 10,
  // },

  buttonPosition: {
    position: 'absolute',
    top: 200,
    left: 10,
  },
  settingsPosition: {
    position: 'absolute',
    top: 12,
    right: 5,
  },
  flex4mb5: {
    // flex: 5,
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
  pl5: {
    paddingLeft: 5,
  },
  // tagStyle: {
  //   width: '100%',
  //   height: '100%',
  //   paddingHorizontal: 5,
  //   borderRadius: 10,
  // },
  expandableBox: {
    height: 65,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    flexDirection: 'row',
    borderColor: '#ddd',
    shadowColor: '#ddd',
    shadowOpacity: 1.0,
    shadowOffset: { width: 10, height: 10 },
    elevation: 3,
  },
  textInExpandable: {
    color: '#3D4851',
    fontSize: 16,
  },
  viewInExpandable: {
    flex: 7,
    marginLeft: 10,
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

  render() {
    const {
      projectId,
      loading,
      notAvailaible,
      projectInfo,
      expandAnalyticsBox,
      expandOverviewBox,
      expandTransactionsBox,
      expandStakeHoldersBox,
      expandProposalsBox,
      expandUpdatesBox,
    } = this.state;
    const allProjects =
      this.props &&
      this.props.projects &&
      this.props.projects.projects &&
      this.props.projects.projects.projects;

    let theProject = allProjects.filter(c => c._id === projectId);
    theProject = theProject[0];

    console.log('preoject', projectInfo);
    if (loading) {
      return (
        <View style={ExtStyle.center}>
          <Spinner />
        </View>
      );
    }
    return (
      <ScrollView style={ExtStyle.flex1} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>
          {notAvailaible ? (
            <View style={{ flex: 1 }}>
              <View style={styles.flex4mb5}>
                <View
                  style={{
                    // flex: 1,
                    height: 300,
                  }}
                >
                  <Image
                    style={{
                      flex: 1,
                      width: null,
                      height: null,
                      resizeMode: 'cover',
                    }}
                    // resizeMode="contain"
                    source={getDummyDisplayPicture(projectInfo && projectInfo.name)}
                    // source={{
                    //   uri:
                    //     projectInfo['project-avatar'] === undefined
                    //       ? 'https://placeimg.com/640/480/any'
                    //       : projectInfo['project-avatar'],
                    // }}
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
                  </TouchableOpacity>
                </View>
                <View style={styles.settingsPosition}>
                  <TouchableOpacity
                    transparent
                    style={styles.backButton}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <View>
                      <Image source={require('../../assets/settings.png')} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    position: 'absolute',
                    top: 120,
                    left: 10,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFFFFF' }}>
                    {' '}
                    {projectInfo.name}
{' '}
                  </Text>
                </View>

                <View style={styles.viewInImage}>
                  <View style={styles.innerView}>
                    <View style={styles.pl5}>
                      <Image
                        style={{ tintColor: '#201d41' }}
                        source={require('../../assets/money.png')}
                      />
                    </View>
                    <View>
                      <Text style={styles.fundedTextColor}>
                        {' '}
                        {fundedStatus[Math.floor(Math.random() * fundedStatus.length)]}
{' '}
funded{' '}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.buttonPosition}>
                  <Button
                    style={{
                      width: width / 3.5,
                      height: height / 15,
                    }}
                    textStyle={{
                      fontSize: 14,
                      fontWeight: '500',
                    }}
                    text="Invest"
                    textColor={WHITE}
                  />
                </View>
              </View>
              <View
                style={{
                  // backgroundColor: 'blue',
                  flex: 1,
                  // flexGrow: 1,
                  // backgroundColor: 'red',
                  marginVertical: 20,
                }}
              >
                <ExpandableBox
                  expand={expandOverviewBox}
                  fn={() => this.expandTheBox('overview')}
                  projectInfo={projectInfo}
                  text="Overview"
                  navigation={this.props.navigation}
                />

                {/* <ExpandableBox
                  expand={expandProposalsBox}
                  fn={() => this.expandTheBox('proposals')}
                  projectInfo={projectInfo}
                  text="Proposals"
                  navigation={this.props.navigation}
                /> */}

                <ExpandableBox
                  expand={expandStakeHoldersBox}
                  fn={() => this.expandTheBox('stakeholders')}
                  projectInfo={projectInfo}
                  text="Stakeholders"
                  navigation={this.props.navigation}
                />

                <ExpandableBox
                  expand={expandAnalyticsBox}
                  projectInfo={projectInfo}
                  fn={() => this.expandTheBox('analytics')}
                  text="Analytics"
                  navigation={this.props.navigation}
                />

                <ExpandableBox
                  expand={expandUpdatesBox}
                  projectInfo={projectInfo}
                  fn={() => this.expandTheBox('updates')}
                  text="Updates"
                  navigation={this.props.navigation}
                />

                <ExpandableBox
                  expand={expandTransactionsBox}
                  projectInfo={projectInfo}
                  fn={() => this.expandTheBox('transaction')}
                  text="Transactions"
                  navigation={this.props.navigation}
                />
              </View>
            </View>
          ) : (
            <View />
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

export default connect(mapStateToProps)(ExploreProject);
