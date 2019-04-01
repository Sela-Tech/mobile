import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { getUserTransactions } from '../../actions/wallet';
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
  state = {
    reloading: false,
    loading: false,
    myBalance: [{ balance: '---' }],
    otherBalance: [],
  };

  async componentDidMount() {
    await this.loadInitialData();
  }

  loadInitialData = async () => {
    try {
      await this.props.getUserWalletTransaction();
      // const myBalance = this.props.wallet.transactions.myTokens.filter(c => c.type === 'native');
      // const otherBalance = this.props.wallet.transactions.myTokens.filter(c => c.type !== 'native');
      // this.setState({ myBalance, otherBalance });
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    }
  };

  reload = async () => {
    this.setState({ reloading: true });
    await this.loadInitialData();
    this.setState({ reloading: false });
  };

  render() {
    const { reloading } = this.state;
    const myBalance =
      (this.props &&
        this.props.wallet &&
        this.props.wallet.transactions &&
        this.props.wallet.transactions.myTokens &&
        this.props.wallet.transactions.myTokens.filter(c => c.type === 'native')) ||
      '---';
    const otherBalance =
      this.props &&
      this.props.wallet &&
      this.props.wallet.transactions &&
      this.props.wallet.transactions.myTokens &&
      this.props.wallet.transactions.myTokens.filter(c => c.type !== 'native');

    return (
      <View style={ExtStyles.flex1}>
        <Header headerName="Wallet" />
        <ScrollView
          style={ExtStyles.flex1}
          contentContainerStyle={styles.centerContainer}
          refreshControl={<RefreshControl refreshing={reloading} onRefresh={this.reload} />}
        >
          <Box
            navigation={this.props.navigation}
            data={myBalance[0]}
            personal
            projectName="Personal Wallet"
            balance={myBalance && myBalance[0] && myBalance[0].balance}
          />
          {otherBalance &&
            otherBalance.map((v, index) => (
              <View key={index}>
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
  wallet: state.wallet,
});

const mapDispatchToProps = dispatch => ({
  getUserWalletTransaction: () => dispatch(getUserTransactions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wallet);
