import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AddUpdateModal from '../components/ContUpdates/AddUpdateModal';
import Text from '../components/Text';
import { isAndroid } from '../utils/helpers';
import { YELLOW } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  boxContainer: {
    flex: 1,
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fdefe2',
    justifyContent: 'center',
    borderRadius: 10,
  },
  updateText: {
    color: '#F2994A',
    fontSize: 12,
    fontWeight: '400',
  },
});

export default class Updates extends Component {
  static navigationOptions = () => ({
    title: 'Updates',
    headerTitleStyle: {
      color: '#201D41',
      fontWeight: '400',
      fontFamily: isAndroid ? 'Acumin-RPro' : null,
      fontSize: 18,
    },
  });

  state = {
    update: [1, 2],
    showModal: false,
    comment: '',
  };

  componentDidMount() { }

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
    const { update, showModal, comment } = this.state;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <AddUpdateModal
          submit={this.submit}
          toggleModal={this.toggleModal}
          comment={comment}
          updateInput={this.updateInput}
          visibility={showModal}
        />
        <View style={{ flexDirection: 'row', marginTop: '5%' }}>
          <View style>
            <Image
              style={{
                justifyContent: 'center',
              }}
              source={require('../../assets/calendar.png')}
            />
          </View>
          <View style={{ marginLeft: 5 }}>
            <Text style={{ color: '#696F74' }}>Deadline</Text>
          </View>
        </View>

        <View
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <View>
            <Text style={{ color: '#222829', fontSize: 14 }}>Task title goes here </Text>
          </View>
          <View>
            <Text style={{ fontSize: 14, letterSpacing: 2 }}>
              Task description goes here. You really think you can fly that thing? Hey, you know how
              I'm, like, always trying to save the planet? Here's my chance. Just my luck, no ice.
{' '}
            </Text>
          </View>
        </View>

        <View style={{ flex: 9 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3 }}>
              <Text style={{ color: '#0A2C56', fontSize: 16 }}>Updates</Text>
            </View>
            <View style={styles.boxContainer}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  marginHorizontal: 2,
                }}
                onPress={() => this.toggleModal()}
              >
                <View style={{ justifyContent: 'center' }}>
                  <Image
                    resizeMode="contain"
                    tintColor={YELLOW}
                    style={{
                      height: 15,
                    }}
                    source={require('../../assets/plus.png')}
                  />
                </View>
                <View>
                  <Text style={styles.updateText}>Add Update</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            {update.length === 0 ? (
              <View style={{ marginTop: 5 }}>
                <Text>You have not submitted updates yet for this task </Text>
              </View>
            ) : (
                <View>
                  <View>
                    <Text>Report 1</Text>
                    <Text>Report 1</Text>
                  </View>
                </View>
              )}
          </View>
        </View>
      </ScrollView>
    );
  }
}
