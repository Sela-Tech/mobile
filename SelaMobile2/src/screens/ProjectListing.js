import React, { Component, Fragment } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { getUserProject } from '../../actions/project';
import Spinner from '../components/Spinner';
import Input from '../components/Input';
import Header from '../components/Header';
import Button from '../components/Button';
import Text from '../components/Text';
import { WHITE, YELLOW } from '../utils/constants';
import ExtStyle from '../utils/styles';
import { isAndroid } from '../utils/helpers';
import Box from '../components/ExploreProject/Box';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: WHITE,
  },
  subContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  inputStyle: {
    borderColor: '#B1BAD2',
    width: width / 1.1,
  },
});

class ExploreProject extends Component {
  static navigationOptions = {
    title: 'EXPLORE',
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      flex: 1,
    },
    headerStyle: {
      fontFamily: 'proximaNova',
      fontWeight: 'normal',
    },
  };

  state = {
    loading: true,
  };

  async componentDidMount() {
    await this.props.getProjects();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const projects =
      this.props &&
      this.props.projects &&
      this.props.projects.projects &&
      this.props.projects.projects.projects;

    return (
      <ScrollView
        style={{
          backgroundColor: WHITE,
        }}
        contentContainerStyle={styles.container}
      >
        <Header headerName="EXPLORE" />
        <View style={styles.subContainer}>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: isAndroid ? '5%' : 10,
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: '300' }}>Search for Projects</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ paddingBottom: 15 }}>
              <Input
                text="All Locations"
                style={styles.inputStyle}
                placeHolderColor="#696F74"
                sideImage={require('../../assets/location.png')}
                sideImageStatus
              />
            </View>
            <View style={{ paddingBottom: 15 }}>
              <Input
                text="Project Status"
                placeHolderColor="#696F74"
                style={styles.inputStyle}
                sideImage={require('../../assets/dropdown.png')}
                sideImageStatus
              />
            </View>
            <View style={{ marginBottom: 30 }}>
              <Input
                text="Project Tag"
                placeHolderColor="#696F74"
                style={styles.inputStyle}
                sideImage={require('../../assets/dropdown.png')}
                sideImageStatus
              />
            </View>
            <View>
              <Button
                text="Find Projects"
                textSize={20}
                color={YELLOW}
                medium
                textColor={WHITE}
                style={styles.inputStyle}
                fn={() => this.props.navigation.navigate('ViewProject')}
              />
            </View>
          </View>
          <View style={{ flex: 5, alignItems: 'center' }}>
            <View style={{ marginVertical: isAndroid ? '6%' : 20 }}>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>Featured Projects</Text>
            </View>
            <View style={{ flex: 1 }}>
              {loading === true ? (
                <Spinner />
              ) : (
                <Fragment>
                  {projects.length === 0 ? (
                    <View style={[ExtStyle.center, { paddingTop: '10%' }]}>
                      <Text style={ExtStyle.largeFontSize}> No project at the moment </Text>
                    </View>
                  ) : (
                    projects.map((c, index) => (
                      <View style={{ marginBottom: 10, marginTop: 10 }}>
                        <Box
                          key={index}
                          fn={() => this.props.navigation.navigate('ExploreProject')}
                          img={require('../../assets/class.png')}
                          firstText="K-Dere Portharcourt"
                          secondText="Sustainability Intl"
                          thirdText="OnGoing"
                          title="Construction of Classroom Blocks"
                          cost="$1,500,000"
                          tags={['Resilient infrasture', 'Sustainable Cities']}
                        />
                      </View>
                    ))
                  )}
                </Fragment>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
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
)(ExploreProject);
