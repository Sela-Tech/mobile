import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Spinner from '../Spinner';

import Button from '../Button';
import Text from '../Text';
import RequestDetails from './RequestDetails';
import EvidenceRequestModal from './EvidenceRequestModal';
import { retrieveEvidenceRequest } from '../../utils/api';
import { WHITE } from '../../utils/constants';
import ExtStyles from '../../utils/styles';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonStyle: {
    width: width / 3,
  },
  mt: {
    marginTop: '10%',
    marginLeft: '10%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  mv10: {
    marginVertical: 10,
  },
});

export default class Request extends Component {
  state = {
    showModal: false,
    loading: false,
    price: '',
    instructions: '',
    loading: true,
    requests: [],
  };

  async componentDidMount() {
    await this.getAllEvidenceRequest();
  }

  toggleModal = () => this.setState(prevState => ({ showModal: !prevState.showModal }));

  updateInput = val => {
    console.log('ref', val);
  };

  getAllEvidenceRequest = async () => {
    try {
      const resp = await retrieveEvidenceRequest(
        this.props && this.props.project && this.props.project._id,
      );

      this.setState({ requests: resp.data.evidenceRequests, loading: false });
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    const { userRole, project } = this.props;
    const stakeholders = project && project.stakeholders;
    const proposals = project && project.proposals;
    const { requests, showModal, loading } = this.state;
    if (loading) {
      return (
        <View style={ExtStyles.center}>
          <Spinner />
        </View>
      );
    }
    if (requests.length === 0) {
      return (
        <View style={styles.container}>
          <EvidenceRequestModal
            stakeholders={stakeholders}
            proposals={proposals}
            formData={this.state}
            project={project}
            visibility={showModal}
            toggleModal={this.toggleModal}
            loading={loading}
            // addRequest={this.addRequest}
            updateInput={this.updateInput}
          />

          <Fragment>
            {userRole !== 'funder' ? (
              <View style={styles.center}>
                <Text> You haven't been assigned to any evidence request </Text>
              </View>
            ) : null}
          </Fragment>

          <Fragment>
            {userRole === 'funder' ? (
              <View style={styles.mt}>
                <Button
                  fn={() => this.toggleModal()}
                  style={styles.buttonStyle}
                  textColor={WHITE}
                  text="Add Request"
                />
              </View>
            ) : null}
          </Fragment>

          <View style={styles.center}>
            {userRole === 'funder' ? <Text>You have not created any evidence request</Text> : null}
          </View>
        </View>
      );
    }
    return (
      <ScrollView style={styles.scrollContainer} contentContainerStyle={ExtStyles.flexGrow1}>
        <EvidenceRequestModal
          stakeholders={stakeholders}
          proposals={proposals}
          formData={this.state}
          visibility={showModal}
          toggleModal={this.toggleModal}
          loading={loading}
          project={project}
          // addRequest={this.addRequest}
          updateInput={this.updateInput}
        />
        <Fragment>
          {userRole === 'funder' ? (
            <View style={styles.mt}>
              <Button
                fn={() => this.toggleModal()}
                style={styles.buttonStyle}
                textColor={WHITE}
                text="Add Request"
              />
            </View>
          ) : null}
        </Fragment>
        <View style={styles.mv10}>
          {requests.map((c, i) => (
            <RequestDetails
              key={i}
              title={c.title}
              dataType={c.datatype}
              dueDate={c.dueDate}
              stakeHolders={c.stakeholders}
              status={c.status}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}