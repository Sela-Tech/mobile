import React, { Component, Fragment } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
// import { getUserProject } from '../../actions/project';
import { getAllProjects } from '../utils/api';
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
    try {
      const resp = await getAllProjects();
      if (resp.data.success === true) {
        this.setState({ loading: false, projects: resp.data.projects })
      }
      else {
        this.setState({
          loading: false,
          error: 'failed',
        });
      }
    }
    catch (err) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, projects } = this.state;

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
                      <View style={[ExtStyle.center, { paddingTop: '2%' }]}>
                        <Text style={{ fontSize: 20 }}> No project at the moment </Text>
                      </View>
                    ) : (
                        projects.map((c, index) => (
                          <View style={{ marginBottom: 10, marginTop: 10 }}>
                            <Box
                              key={index}
                              fn={() => this.props.navigation.navigate('ExploreProject', c._id)}
                              img={{ uri: 'https://placeimg.com/640/480/any' }}
                              firstText={c.location.name}
                              secondText={c.name}
                              thirdText={c.status}
                              title={c.description}
                              cost={c.raised}
                              tags={c.tags}
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
