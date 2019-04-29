import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ExtStyles from '../../utils/styles';
import Text from '../../components/Text';
import Content from '../../components/ContUpdates/ShortContent';
import AddUpdateModal from '../../components/ContUpdates/AddUpdateModal';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 7,
  },
  text: {
    color: '#0A2C56',
    fontSize: 16,
    fontWeight: '400',
  },
  mileStoneText: {
    color: '#222829',
    fontSize: 15,
  },
});

export default class Updates extends Component {
  state = {
    showModal: false,
    comment: '',
  };

  toggleModal = () => this.setState(prevState => ({ showModal: !prevState.showModal }));

  updateInput = (val, name) => {
    if (name === 'comment') {
      this.setState({
        comment: val,
      });
    }
  };

  submit = () => {
    this.toggleModal();
  };

  render() {
    const { comment, showModal } = this.state;
    return (
      <ScrollView style={styles.container} contentContainerStyle={ExtStyles.flexGrow1}>
        <AddUpdateModal
          submit={this.submit}
          toggleModal={this.toggleModal}
          comment={comment}
          updateInput={this.updateInput}
          visibility={showModal}
        />
        <View>
          <Text style={styles.text}>Milestones and tasks</Text>
        </View>
        <View style={[ExtStyles.row, ExtStyles.mt10]}>
          <View>
            <Text style={styles.mileStoneText}>1</Text>
          </View>
          <View style={{ marginLeft: '8%' }}>
            <Text style={styles.mileStoneText}> Milestone 1</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 5 }}>
          <View>
            <Content
              toggleModal={this.toggleModal}
              deadline="May 21st, 1019"
              title="The Task title goes here"
            />
            <Content
              toggleModal={this.toggleModal}
              deadline="May 21st, 1019"
              title="The Task title goes here"
            />
            <Content
              toggleModal={this.toggleModal}
              deadline="May 21st, 1019"
              title="The Task title goes here"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
