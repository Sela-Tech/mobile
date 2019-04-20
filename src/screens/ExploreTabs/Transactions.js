import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import moment from 'moment';
import Text from '../../components/Text';
import Spinner from '../../components/Spinner';
import SingleTrans from '../../components/Transactions/SingleTrans';
import { WHITE } from '../../utils/constants';
import ExtStyles from '../../utils/styles';
import { getProjectBalance } from '../../utils/api';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    // backgroundColor: 'red',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  subContainer: {
    flex: 5,
    marginTop: height / 4,
    alignItems: 'center',
  },
  button: {
    width: width / 2,
  },
});

// const Transactions = ({ project }) => {

export default class Transactions extends Component {
  state = {
    loading: true,
    transactions: [],
  };

  async componentDidMount() {
    try {
      const resp = await getProjectBalance(this.props.project._id);

      // const transaction = resp.data.myTokens.filter(c => c.type !== 'native');

      this.setState({ transactions: resp.data.transactions, loading: false });
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  render() {
    const { project } = this.props;
    // const { transactions } = project;
    const { loading, transactions } = this.state;

    if (loading) {
      return (
        <View style={ExtStyles.center}>
          <Spinner />
        </View>
      );
    }

    if ((transactions && transactions.length === 0) || transactions === undefined) {
      return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
              <Image source={require('../../../assets/docs.png')} />
            </View>
            <View style={{ alignItems: 'center', margin: 10 }}>
              <Text> There are no transactions yet for </Text>
              <Text> this project. Check back later. </Text>
            </View>

            {/* <Button fn={() => NavigationService.navigate('Invest')} text="INVEST" textColor={WHITE} /> */}
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
        {transactions.map((c, index) => (
          <SingleTrans
            key={index}
            price={`${c.value} PST`}
            date={moment(c.updatedAt).format('MMMM Do YYYY')}
            title={c.memo}
            paidBy={`${c.sender.firstName} ${c.sender.lastName}`}
          />
        ))}
      </ScrollView>
    );
  }
}
