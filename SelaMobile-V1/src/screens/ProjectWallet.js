import React, { Component, Fragment } from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Transaction from '../components/Wallet/Transaction';
import SendModal from '../components/Wallet/SendModal';
import Header from '../components/Wallet/Header';
import Spinner from '../components/Spinner';
import { getUserTransactions } from '../../actions/wallet';
import { getProjectBalance, transferFund } from '../utils/api';
import ExtStyles from '../utils/styles';
import Button from '../components/Button';
import { WHITE } from '../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
  header: {
    height: height / 4,
    backgroundColor: '#0A2C56',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerContainer: {
    height: height / 2,
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
    modalVisibility: false,
    amountToBeSent: 0,
    remarks: '',
    receiverID: '',
    loading: false,
    balance: this.props.navigation.state.params.balance,
  };

  async componentDidMount() {
    try {
      const resp = await getProjectBalance(this.props.navigation.state.params.projectId);
      const nativeBalance = resp.data.myTokens.find(c => c.type === 'native').balance;

      // get first stakeholder user id
      const firstId =
        this.props &&
        this.props.projects &&
        this.props.projects.projects &&
        this.props.projects.projects.find(
          c => c._id === this.props.navigation.state.params.projectId,
        ).stakeholders[0].user.information._id;

      this.setState({
        receiverID: firstId,
        transaction: resp.data.transactions,
        nativeBalance,
        loading: false,
      });
    } catch (err) {
      console.log('...', err.message);
      this.setState({ error: err.message, loading: false });
    }
  }

  sendMoney = async () => {
    const { receiverID, remarks, amountToBeSent, balance } = this.state;
    this.setState({ loading: true });
    const data = {
      projectId: this.props.navigation.state.params.projectId,
      receiver: receiverID,
      assetType: 'pst',
      amount: amountToBeSent,
      remarks,
    };
    if (amountToBeSent === '') {
      return alert('Enter amount');
    }
    if (remarks === '') {
      return alert('Enter Remarks');
    }
    if (amountToBeSent > parseInt(balance)) {
      return alert('Insufficient PST');
    }
    try {
      const resp = await transferFund(data);
      alert('PST sent');
      const newBalance = balance - amountToBeSent;
      this.setState(prevState => ({
        modalVisibility: !prevState.modalVisibility,
        balance: newBalance,
        remarks: '',
        loading: false,
      }));
      this.props.getUserWalletTransaction();
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  };

  toggleModal = () => this.setState(prevState => ({ modalVisibility: !prevState.modalVisibility }));

  updateInput = (val, name) => {
    if (name === 'amountToBeSent') {
      this.setState({
        amountToBeSent: val,
      });
    } else if (name === 'receiverID') {
      this.setState({
        receiverID: val,
      });
    } else {
      this.setState({
        remarks: val,
      });
    }
  };

  render() {
    const projectStakeholders =
      this.props &&
      this.props.projects &&
      this.props.projects.projects &&
      this.props.projects.projects.find(c => c._id === this.props.navigation.state.params.projectId)
        .stakeholders;
    const data = this.props.navigation.state.params;

    const { projectName } = data;
    const {
      modalVisibility,
      transaction,
      nativeBalance,
      loading,
      amountToBeSent,
      remarks,
      receiverID,
      balance,
    } = this.state;
    const transferData = {
      amountToBeSent,
      remarks,
      receiverID,
    };
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header
          navigation={this.props.navigation}
          title={projectName}
          balance={balance}
          nativeBalance={
            nativeBalance === '---' ? nativeBalance : parseFloat(nativeBalance)//.toFixed(3)
          }
        />
        <SendModal
          visibility={modalVisibility}
          toggleModal={this.toggleModal}
          sendMoney={this.sendMoney}
          data={transferData}
          updateInput={this.updateInput}
          loading={loading}
          projectStakeholders={projectStakeholders}
        />
        <Fragment>
          {transaction.length === 0 ? null : (
            <Fragment>
              <View style={{ marginVertical: 10, marginLeft: 25 }}>
                <Button
                  fn={() => this.toggleModal()}
                  style={{
                    width: width / 2.5,
                  }}
                  textStyle={{
                    color: WHITE,
                  }}
                  text="Send"
                />
              </View>
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
                        taskName={c.memo}
                        imageSource={{ uri: c.sender.profilePhoto }}
                        sender={`${c.sender.firstName} ${c.sender.lastName}`}
                        amount={c.value}
                        date={c.updatedAt}
                      />
                    ))}
                  </Fragment>
                )}
              </View>
            </Fragment>
          )}
        </Fragment>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => ({
  getUserWalletTransaction: () => dispatch(getUserTransactions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectWallet);
