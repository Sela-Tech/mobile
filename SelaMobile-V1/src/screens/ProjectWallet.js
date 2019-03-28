import React, { Component } from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Transaction from '../components/Wallet/Transaction';
import Header from '../components/Wallet/Header';
import { getProjectBalance } from '../utils/api';

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
  };

  async componentDidMount() {
    try {
      const resp = await getProjectBalance(this.props.state.params.id);
      this.setState({ project: resp.data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const data = this.props.navigation.state.params;
    const { transaction } = this.state;
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
