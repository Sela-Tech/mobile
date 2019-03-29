import React, { Component, Fragment } from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Transaction from '../components/Wallet/Transaction';
import Header from '../components/Wallet/Header';
import Spinner from '../components/Spinner';
import { getProjectBalance } from '../utils/api';
import ExtStyles from '../utils/styles';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
  header: {
    height: height / 4,
    backgroundColor: '#0A2C56',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    height: height / 1.5,
    borderColor: '#ddd',
    shadowColor: '#ddd',
    shadowOpacity: 1.0,
    shadowOffset: { width: 10, height: 10 },
    elevation: 1,
    borderRadius: 5,
    marginHorizontal: 25,
    marginVertical: 20,
  },

  buttonPosition: {
    position: 'absolute',
    top: height / 8,
    bottom: 0,
    left: 20,
    right: 0,
  },
  flex4mb5: {
    flex: 4,
  },
});

class ProjectWallet extends Component {
  state = {
    transaction: [],
    nativeBalance: '---',
    loading: true,
  };

  async componentDidMount() {
    try {
      const resp = await getProjectBalance(this.props.navigation.state.params.projectId);
      const nativeBalance = resp.data.myTokens.find(c => c.type === 'native').balance;

      // const transaction = resp.data.myTokens.filter(c => c.type !== 'native');
      // console.log('the native balance', resp.data);
      this.setState({ transaction: resp.data.transactions, nativeBalance, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const data = this.props.navigation.state.params;
    const { projectName, balance } = data;
    const { transaction, nativeBalance, loading } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header
          navigation={this.props.navigation}
          title={projectName}
          balance={balance}
          nativeBalance={
            nativeBalance === '---' ? nativeBalance : parseFloat(nativeBalance).toFixed(3)
          }
        />
        <View style={styles.innerContainer}>
          {loading ? (
            <View style={ExtStyles.center}>
              <Spinner color="#0A2C56" />
            </View>
          ) : (
            <Fragment>
              {transaction.map((c, index) => (
                <Transaction
                  key={index}
                  data={c}
                  taskName="payment for task"
                  imageSource={{ uri: c.sender.profilePhoto }}
                  sender={c.sender.firstName +  ' ' + c.sender.lastName}
                  amount={c.value}
                  date={c.updatedAt}
                />
              ))}
            </Fragment>
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(ProjectWallet);

// mmmfff', { myTokens:
// 03-29 09:58:58.628  4252  5023 I ReactNativeJS:    [ { type: 'native', balance: '49.9999900' },
// 03-29 09:58:58.628  4252  5023 I ReactNativeJS:      { projectId: '5c9cac3534b85b0022975e0e',
// 03-29 09:58:58.628  4252  5023 I ReactNativeJS:        projectName: 'Oil Spill Cleanup',
// 03-29 09:58:58.628  4252  5023 I ReactNativeJS:        type: 'credit_alphanum12',
// 03-29 09:58:58.628  4252  5023 I ReactNativeJS:        token: 'PST33AD',
// 03-29 09:58:58.628  4252  5023 I ReactNativeJS:        balance: '0.0000000' } ],
// 03-29 09:58:58.628  4252  5023 I ReactNativeJS:   createdTokens: [] }
// 03-29 09:59:04.994  4252  5023 I ReactNativeJS: 'kkgfgf', { projectName: 'Oil Spill Cleanup',
// 03-29 09:59:04.994  4252  5023 I ReactNativeJS:   myTokens:
// 03-29 09:59:04.994  4252  5023 I ReactNativeJS:    [ { type: 'credit_alphanum12',
// 03-29 09:59:04.994  4252  5023 I ReactNativeJS:        balance: '0.0000000',
// 03-29 09:59:04.994  4252  5023 I ReactNativeJS:        token: 'PST33AD' },
// 03-29 09:59:04.994  4252  5023 I ReactNativeJS:      { type: 'native', balance: '49.9999900' } ],
// 03-29 09:59:04.994  4252  5023 I ReactNativeJS:   transactions: [] }

//  { myTokens:
//     [ { type: 'native', balance: '49.9999900' },
//       { projectId: '5c9cac3534b85b0022975e0e',
//         projectName: 'Oil Spill Cleanup',
//         type: 'credit_alphanum12',
//         token: 'PST33AD',
//         balance: '0.0000000' } ],
//    createdTokens: [] }
