import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Text from '../components/Text';
import Box from '../components/Wallet/Box';
import { WHITE } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex: 1,
  },
  centerContainer: {
    flexGrow: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 10,
    paddingBottom: '10%',
    justifyContent: 'space-between',
  },
});

class Wallet extends Component {
  state = {
    projects: [1],
  };

  render() {
    // const { projects } = this.state;
    const projects = (this.props && this.props.projects && this.props.projects.projects) || [];

    return (
      <View style={{ flex: 1 }}>
        <Header headerName="Wallet" />
        <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.centerContainer}>
          {projects.map((v, index) => (
            <View key={v._id}>
              <Box
                fn={() => this.props.navigation.navigate('ProjectWallet', v)}
                key={index}
                projectName={v.name}
                empty={(v && v.uri) !== ''}
                projectsource={{ uri: v.uri }}
                siteName={v.siteName}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

export default connect(mapStateToProps)(Wallet);
