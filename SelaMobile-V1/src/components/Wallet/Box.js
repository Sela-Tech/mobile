import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../Spinner';
import Text from '../Text';
import { retrieveEvidenceRequest } from '../../utils/api';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height / 4,
    width: width / 2.2,
    borderRadius: 5,
    marginTop: 15,
    borderStyle: 'dotted',
    borderWidth: 1,
    backgroundColor: '#0A2C56',
  },
  text: {
    marginTop: 5,
    flex: 2,
  },
});

class Box extends Component {
  state = {
    loading: true,
    requests: [],
  };

  async componentDidMount() {
    await this.getAllEvidenceRequest();
  }

  getAllEvidenceRequest = async () => {
    try {
      const resp = await retrieveEvidenceRequest(this.props.data._id);
      this.setState({ requests: resp.data.evidenceRequests, loading: false });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { projectName, fn, navigation } = this.props;
    const { loading, requests } = this.state;

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
    // Flatten array
    const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
    const trans = flatten(completed);
    const totalAmount = trans.reduce((c, d) => d.quote + c, 0);
    const allInfo = {
      projectName,
      completed:trans,
      totalAmount,
    };
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProjectWallet', allInfo) }>
        <View style={{ flex: 1, marginHorizontal: 9, justifyContent: 'center' }}>
          <View style={{ flex: 1, marginTop: 12, flexDirection: 'column' }}>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
              <Image source={require('../../../assets/suitcase.png')} />
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
                        height: 20,
                        width: 30,
                        backgroundColor: '#156EDC',
                        justifyContent: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}> PST </Text>
                    </View>
                  </View>
                  <View style={{ marginLeft: 5 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 30, fontWeight: '400' }}>
                      {totalAmount}
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
