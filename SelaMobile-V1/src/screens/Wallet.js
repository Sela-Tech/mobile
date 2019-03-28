import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Box from '../components/Wallet/Box';
import { WHITE } from '../utils/constants';
import { getUserBalance } from '../utils/api';

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
  state = {
    loading: false,
    myBalance: [],
    otherBalance: [],
  };

  async componentDidMount() {
    try {
      const resp = await getUserBalance();
      console.log('mmmfff', resp.data);
      const myBalance = resp.data.myTokens.filter(c => c.type === 'native');
      const otherBalance = resp.data.myTokens.filter(c => c.type !== 'native');
      // const personalBalance = resp.data.myTokens
      this.setState({ myBalance, otherBalance });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  }

  render() {
    const projects = (this.props && this.props.projects && this.props.projects.projects) || [];
    const { myBalance, otherBalance } = this.state;

    return (
      <View style={ExtStyles.flex1}>
        <Header headerName="Wallet" />
        <ScrollView style={ExtStyles.flex1} contentContainerStyle={styles.centerContainer}>
          <Box
            navigation={this.props.navigation}
            data={myBalance[0]}
            personal
            projectName="Personal Wallet"
            balance={myBalance && myBalance[0] && myBalance[0].balance}
          />
          {otherBalance.map((v, index) => (
            <View key={v._id}>
              <Box
                projectName={v.projectName}
                navigation={this.props.navigation}
                key={index}
                data={v}
                balance={v.balance}
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
