import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Text from '../Text';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height / 4,
    width: width / 2.2,
    borderRadius: 5,
    marginTop: 15,
    borderStyle: 'dotted',
    // borderWidth: 1,
    backgroundColor: '#0A2C56',
  },
  text: {
    marginTop: 5,
    flex: 2,
  },
});

class Box extends Component {
  state = {
    loading: false,
    requests: [],
  };

  // async componentDidMount() {
  //   if (this.props.personal) {
  //     this.setState({ loading: false });
  //   }
  //   await this.getAllEvidenceRequest();
  // }

  // getAllEvidenceRequest = async () => {
  //   try {
  //     const resp = await retrieveEvidenceRequest(this.props.data._id);
  //     this.setState({ requests: resp.data.evidenceRequests, loading: false });
  //   } catch (err) {
  //     this.setState({ error: err.message });
  //   }
  // };

  render() {
    const { projectName, data, fn, navigation, personal, balance } = this.props;
    const { loading } = this.state;
    return (
      <TouchableOpacity
        style={[styles.container, personal ? { backgroundColor: '#156EDC' } : null]}
        onPress={() => (personal ? console.log() : navigation.navigate('ProjectWallet', data))}
      >
        <View style={{ flex: 1, marginHorizontal: 9, justifyContent: 'center' }}>
          <View style={{ flex: 1, marginTop: 12, flexDirection: 'column' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Image
                source={
                  personal
                    ? require('../../../assets/profile_wallet.png')
                    : require('../../../assets/suitcase.png')
                }
              />
            </View>
            <View style={styles.text}>
              <Text style={{ fontSize: 15, color: '#FFFFFF' }}>{projectName}</Text>
            </View>
          </View>
          <View
            style={{
              marginBottom: 10,
              flex: 1,
            }}
          >
            {loading ? (
              <Spinner color={WHITE} />
            ) : (
              <Fragment>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                  <Text style={{ color: '#BFDBFE', fontSize: 20, fontWeight: '500' }}>
                    Balance{' '}
                  </Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center' }}>
                    <View
                      style={{
                        height: width / 18,
                        width: width / 11.5,
                        backgroundColor: personal ? '#369C05' : '#156EDC',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                        {personal ? 'XLM' : 'PST'}{' '}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginLeft: 5, marginTop: 5 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '400' }}>
                      {balance === '---' ? balance : parseFloat(balance).toFixed(6)}
                    </Text>
                  </View>
                </View>
              </Fragment>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

Box.defaultProps = {
  empty: null,
  projectName: '',
  imageSource: '',
  fn: null,
  expandFn: null,
  text: 'Add New Site',
};

Box.propTypes = {
  projectName: PropTypes.string,
  text: PropTypes.string,
  fn: PropTypes.func,
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(Box);
