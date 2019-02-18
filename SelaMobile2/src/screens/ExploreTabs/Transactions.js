import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import NavigationService from '../../services/NavigationService';
import Button from '../../components/Button';
import Text from '../../components/Text';
import SingleTrans from '../../components/Transactions/SingleTrans';
import { WHITE } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
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

const Transactions = ({ project }) => {
  const { transactions } = project;
  if (transactions.length !== 0) {
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
      <SingleTrans
        price="$4,500"
        date="13 Jun 2018, 14:55"
        content="Supplies"
        spendingCategory="Evaluation Team"
        transactionInitiator="Isaiah Udotong"
      />

      <SingleTrans
        price="$3,500"
        date="13 Jun 2018, 14:55"
        content="Purchase of Equipment"
        transactionInitiator="Collins Peter"
        spendingCategory="Evaluation Team"
      />
      <SingleTrans
        price="$10,500"
        date="13 Jun 2018, 14:55"
        content="VSE team payment"
        spendingCategory="Evaluation Team"
        transactionInitiator="Isaiah Udotong"
      />
      <SingleTrans
        price="$1,500"
        date="13 Jun 2018, 14:55"
        content="Miscellaneous"
        spendingCategory="Evaluation Team"
        transactionInitiator="Collins Peter"
      />
      <View style={{ alignItems: 'center' }}>
        {/* <View>
          <Button
            fn={() => NavigationService.navigate('Invest', { name: project.name })}
            text="INVEST"
          />
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Transactions;
