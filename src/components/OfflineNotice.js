import React, { PureComponent } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateNetwork } from '../../actions/network';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: height / 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
  },
  offlineText: { color: '#fff' },
});

const MiniOfflineSign = () => (
  <View style={styles.offlineContainer}>
    <Text style={styles.offlineText}>No Internet Connection</Text>
  </View>
);

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
    this.props.updateNetworkConnection(isConnected);
    if (isConnected) {
      this.setState({ isConnected });
    } else {
      this.setState({ isConnected });
    }
  };

  render() {
    const { isConnected } = this.state;
    if (!isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  updateNetworkConnection: status => dispatch(updateNetwork(status)),
});

export default connect(mapDispatchToProps)(OfflineNotice);
