import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Box from '../components/ExploreProject/Box';
import Header from '../components/Header';
import Spinner from '../components/Spinner';
import { getAllProjects } from '../utils/api';
import ExtStyle from '../utils/styles';
import { getDummyDisplayPicture } from '../utils/helpers';
import Text from '../components/Text';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  pv20: {
    paddingVertical: 20,
  },
  textContainer: {
    marginLeft: '5%',
    marginTop: '3%',
  },
  otherContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default class ViewProject extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    try {
      const resp = await getAllProjects();
      if (resp.data.success === true) {
        this.setState({ loading: false, projects: resp.data.projects });
      } else {
        this.setState({
          loading: false,
          error: 'failed',
        });
      }
    } catch (err) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, projects } = this.state;
    return (
      <ScrollView
        style={ExtStyle.flex1}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.container}
      >
        <Header justBack navigation={this.props.navigation} headerName="PROFILE" />
        <View style={styles.pv20}>
          <Fragment>
            {loading ? (
              <View style={ExtStyle.center}>
                <Spinner />
              </View>
            ) : (
              <View style={styles.subContainer}>
                {projects.length === 0 ? (
                  <View style={ExtStyle.center}>
                    <Text style={ExtStyle.ft15}> No project at the moment </Text>
                  </View>
                ) : (
                  projects.map(c => (
                    <View key={c._id}>
                      <Box
                        fn={() => this.props.navigation.navigate('ExploreProject', c._id)}
                        img={getDummyDisplayPicture(c && c.name)}
                        // img={{ uri: 'https://placeimg.com/640/480/any' }}
                        firstText={c.location.name}
                        secondText={c.name}
                        thirdText={c.status}
                        title={c.description}
                        cost={c.budget}
                        tags={c.tags}
                      />
                    </View>
                  ))
                )}
              </View>
            )}
          </Fragment>
        </View>
      </ScrollView>
    );
  }
}
