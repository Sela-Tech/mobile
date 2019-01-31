import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { WHITE } from '../utils/constants';
import Box from '../components/ExploreProject/Box';
import Spinner from '../components/Spinner';
import { getAllProjects } from '../utils/api';
import ExtStyle from '../utils/styles';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: WHITE,
    paddingBottom: 20,
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
});

export default class ViewProject extends Component {

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
        <Fragment>
          {loading ? (
            <View style={ExtStyle.center}>
              <Spinner />
            </View>
          ) :
            (
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
                    cost={c.budget}
                    tags={c.tags}
                  />
                </View>
              )))
          }
        </Fragment>
      </ScrollView>
    );
  }
}
