import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Box from '../components/Wallet/Box';
import { WHITE } from '../utils/constants';

import ExtStyles from '../utils/styles';

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
  render() {
    const projects = (this.props && this.props.projects && this.props.projects.projects) || [];

    return (
      <View style={ExtStyles.flex1}>
        <Header headerName="Wallet" />
        <ScrollView style={ExtStyles.flex1} contentContainerStyle={styles.centerContainer}>
          {projects.map((v, index) => (
            <View key={v._id}>
              <Box
                navigation={this.props.navigation}
                key={index}
                data={v}
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
