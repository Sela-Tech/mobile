import React, { Component, Fragment } from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Text from '../components/Text';
import Spinner from '../components/Spinner';
import ExtStyles from '../utils/styles';
import { retrieveEvidenceRequest } from '../utils/api';
import Transaction from '../components/Wallet/Transaction';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
  header: {
    height: height / 4,
    backgroundColor: '#0A2C56',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '500',
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
});

const Header = ({ title, balance }) => (
  <View style={styles.header}>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={styles.title}> {title} </Text>
    </View>
    <View style={{ flex: 2, justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ color: '#BFDBFE', fontWeight: '300' }}> Balance </Text>
      </View>
      <View style={{ flex: 3, justifyContent: 'center', flexDirection: 'row' }}>
        <View style={{ marginTop: '10%' }}>
          <View
            style={{
              height: 15,
              width: 20,
              backgroundColor: '#156EDC',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: 8, fontWeight: '300' }}> PST </Text>
          </View>
        </View>
        <View style={{}}>
          <Text style={styles.balance}> {balance} </Text>
        </View>
      </View>
    </View>
  </View>
);

class ProjectWallet extends Component {
  state = {
    loading: true,
    requests: [],
  };

  async componentDidMount() {
    await this.getAllEvidenceRequest();
  }

  getAllEvidenceRequest = async () => {
    try {
      const resp = await retrieveEvidenceRequest(
        this.props.navigation.state.params._id,
        // this.props && this.props.project && this.props.project._id,
      );
      // console.log('res', resp.data);
      this.setState({ requests: resp.data.evidenceRequests, loading: false });
    } catch (err) {
      console.log('the ereo', err.message);
    }
  };

  render() {
    const data = this.props.navigation.state.params;
    const { loading, requests } = this.state;

    console.log('fhhfhgf', this.props.userInfo.user.id);
    const completed =
      requests &&
      requests.reduce((b, c) => {
        const vv = c.stakeholders.filter(b => {
          b.taskName = c.title;
          b.requestedBy = c.requestedBy.fullName;
          b.profilePhoto = c.requestedBy.profilePhoto;
          b.dueDate = c.dueDate;
          return b.user._id === this.props.userInfo.user.id && b.hasSubmitted;
        });
        b.push(vv);
        return b;
      }, []);
    const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
    const trans = flatten(completed);
    const totalAmount = trans.reduce((c, d) => d.quote + c, 0);
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header title={data.name} balance={totalAmount} />
        <Fragment>
          {loading ? (
            <Spinner color="#0A2C56" />
          ) : (
            <View style={styles.innerContainer}>
              {trans.map(
                (c, index) => (
                    <Transaction
                      key={index}
                      data={c}
                      imageSource={{uri: c.profilePhoto}}
                      sender={c.requestedBy}
                      amount={c.quote}
                      date={c.dueDate}
                    />
                  )
              )}
            </View>
          )}
        </Fragment>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(ProjectWallet);
