import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Button from '../Button';
import Text from '../Text';
import RequestDetails from './RequestDetails';
import EvidenceRequestModal from './EvidenceRequestModal';
import TableRequestModal from './TableRequestModal';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
});

export default class Request extends Component {
  state = {
    showModal: false,
    loading: false,
    price: '',
    instructions: '',
    empty: false,
  };

  toggleModal = () => this.setState(prevState => ({ showModal: !prevState.showModal }));

  addRequest = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
    alert('success');
  };

  updateInput = (ref, val) => {
    console.log('ref', ref);
  };

  render() {
    const { showModal, loading, empty } = this.state;
    if (empty) {
      return (
        <View style={styles.container}>
          {/* <EvidenceRequestModal
          formData={this.state}
          visibility={showModal}
          toggleModal={this.toggleModal}
          loading={loading}
          addRequest={this.addRequest}
          updateInput={this.updateInput}
        /> */}

          <TableRequestModal
            formData={this.state}
            visibility={showModal}
            toggleModal={this.toggleModal}
            loading={loading}
            addRequest={this.addRequest}
            updateInput={this.updateInput}
          />

          <View style={{ marginTop: '10%' }}>
            <Button
              fn={() => this.toggleModal()}
              style={{
                width: width / 3,
              }}
              textColor={WHITE}
              text="Add Request"
            />
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>You have not made any evidence request</Text>
          </View>
        </View>
      );
    }
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: '8%' }}>
          <Button
            fn={() => this.toggleModal()}
            style={{
              width: width / 3,
            }}
            textColor={WHITE}
            text="Add Request"
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <RequestDetails title="Results of laboratory analysis" />

          <RequestDetails title="Community response to project" />
        </View>
      </ScrollView>
    );
  }
}
