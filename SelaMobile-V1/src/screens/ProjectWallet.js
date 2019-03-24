import React, { Component } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Text from '../components/Text';
import Transaction from '../components/Wallet/Transaction';
import { WHITE } from '../utils/constants';

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
  imagePosition: {
    position: 'absolute',
    top: 12,
    bottom: 0,
    left: 0,
    right: 0,
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
    // marginBottom: 1,
  },
  backButton: {
    marginTop: '7%',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  backButtonText: {
    color: WHITE,
    fontSize: 15,
  },
});

const Header = ({ title, balance, navigation }) => (
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
        <View>
          <Text style={styles.balance}> {balance} </Text>
        </View>
      </View>
    </View>
    <View style={styles.imagePosition}>
      <TouchableOpacity
        transparent
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <View>
          <Image source={require('../../assets/white-back.png')} />
        </View>
        <View>
          <Text style={styles.backButtonText}> Back </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

class ProjectWallet extends Component {
  render() {
    const data = this.props.navigation.state.params;
    const { completed, totalAmount, projectName } = data;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header navigation={this.props.navigation} title={projectName} balance={totalAmount} />
        <View style={styles.innerContainer}>
          {completed.map((c, index) => (
            <Transaction
              key={index}
              data={c}
              imageSource={{ uri: c.profilePhoto }}
              sender={c.requestedBy}
              amount={c.quote}
              date={c.dueDate}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(ProjectWallet);
