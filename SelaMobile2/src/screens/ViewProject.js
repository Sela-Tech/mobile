import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { WHITE } from '../utils/constants';
import Box from '../components/ExploreProject/Box';
import Spinner from '../components/Spinner';
import { getAllProjects } from '../utils/api';
import ExtStyle from '../utils/styles';
import Text from '../components/Text';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    // paddingBottom: 20,
    // paddingHorizontal: 20,
    // alignItems: 'center',
    // width: width / 1.1,
    // marginBottom: 10,
    // borderRadius: 10,
    // justifyContent: 'center',
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
          flex: 1,
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
              <View style={{ flex: 1, alignItems: 'center' }}>
                {
                  projects.length === 0 ?
                    (
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        <Text style={{ fontSize: 15 }}> No project at the moment </Text>
                      </View>
                    ) :
                    (
                      projects.map((c, index) => (
                        <View>
                          <Box
                            key={index}
                            fn={() => this.props.navigation.navigate('ExploreProject', c._id)}
                            img={require('../../assets/img/cleanup/water.jpg')}
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
                    )
                }
              </View>
            )
          }
        </Fragment>
      </ScrollView>
    );
  }
}
