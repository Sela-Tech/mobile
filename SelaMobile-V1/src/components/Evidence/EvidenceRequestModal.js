import React, { Component, Fragment } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Picker,
} from 'react-native';
import Modal from 'react-native-modal';
import { CheckBox } from 'native-base';
import TableRequestModal from './TableRequestModal';
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';
import { WHITE, YELLOW } from '../../utils/constants';
import ExtStyle from '../../utils/styles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: YELLOW,
    width: width / 2.5,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    // marginBottom: 10,
    // backgroundColor: 'red',
  },
  bottomButton: {
    // flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // height: height /7,
    // marginBottom: 30,
  },
  textStyle: {
    color: '#3D4851',
    fontSize: 14,
    fontWeight: '400',
  },
  upContainer: {
    flex: 1,
    height: height /10,
    backgroundColor: '#F5F5F8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mv5: {
    marginVertical: 5,
  },
  middleContainer: {
    flex: 6,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputStyle: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#DDDDDD',
  },
  centerUpText: {
    flex: 1,
    alignItems: 'center',
  },
  closeButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addTaskText: {
    color: '#201D41',
    fontSize: 18,
  },
  addTaskView: {
    flex: 2,
    alignItems: 'flex-end',
  },
  otherContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  inputStyle2: {
    borderColor: '#B1BAD2',
    // width: width / 1.1,
  },
  picker: {
    borderColor: '#B1BAD2',
    borderRadius: 5,
    borderWidth: 1,
    height: height / 13,
    width: '100%',
  },
});

const CheckBoxContainer = ({ level }) => (
  <View style={styles.checkBoxContainer}>
    <View style={{ flex: 1 }}>
      <CheckBox color="#201D41" onPress={() => console.log('i am here')} checked />
    </View>
    <View style={{ flex: 7 }}>
      <Text> {level}
{' '}
Level Request
{' '}
</Text>
    </View>
  </View>
);

export default class EvidenceRequestModal extends Component {
  state = {
    evidenceRequestLevel: true, // Default evidence request level is task level
    proposals: ['1', '2', '3'],
    proposalID: '1',
    instructionVal: '',
  };

  render() {
    const { visibility, toggleModal, addRequest, updateInput, formData, loading } = this.props;
    const { price, instructions } = formData;
    const { proposals, proposalID, instructionVal,evidenceRequestLevel } = this.state;
    return (
      <Modal isVisible={visibility}>
        <KeyboardAvoidingView enabled style={ExtStyle.flex1}>
          <ScrollView style={styles.container} contentContainerStyle={[ExtStyle.flexGrow]}>
            <View style={styles.upContainer}>
              <View style={styles.addTaskView}>
                <Text style={styles.addTaskText}>Add Evidence Request</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal()}>
                <Image source={require('../../../assets/close_icon.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.middleContainer}>
              <View style={{ flex: 1, height: height /10, }}>
                <CheckBoxContainer level="Task" />
                <CheckBoxContainer level="Project" />
              </View>
              <View style={{ flex: 1 }}>
              <Fragment>
              {
                  evidenceRequestLevel ?
                  (
                <Fragment>
                <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}>Proposal </Text>
                  </View>
                  <View style={[styles.inputStyle2, styles.picker, { paddingBottom: 15 }]}>
                    <Picker
                      style={[styles.picker]}
                      selectedValue={proposalID}
                      onValueChange={id => this.setState({ proposalID: id })}
                    >
                      {proposals.map((s, i) => (
                        <Picker.Item
                          key={i}
                          style={[styles.inputStyle, styles.picker]}
                          label={s}
                          value={s}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}>Task </Text>
                  </View>
                  <View style={[styles.inputStyle2, styles.picker, { paddingBottom: 15 }]}>
                    <Picker
                      style={[styles.picker]}
                      selectedValue={proposalID}
                      onValueChange={id => this.setState({ proposalID: id })}
                    >
                      {proposals.map((s, i) => (
                        <Picker.Item
                          key={i}
                          style={[styles.inputStyle, styles.picker]}
                          label={s}
                          value={s}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                </Fragment>
                ):
                (
                 <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}> Request Title </Text>
                  </View>
                  <Input
                    style={[styles.picker]}
                    textStyle={ExtStyle.multiLineInputStyle}
                    onChangeTheText={val => console.log('')}
                    value={instructionVal}
                  />
                </View>
                )}  
                </Fragment>
                <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}>Data type </Text>
                  </View>
                  <View style={[styles.inputStyle2, styles.picker, { paddingBottom: 15 }]}>
                    <Picker
                      style={[styles.picker]}
                      selectedValue={proposalID}
                      onValueChange={id => this.setState({ proposalID: id })}
                    >
                      {proposals.map((s, i) => (
                        <Picker.Item
                          key={i}
                          style={[styles.inputStyle, styles.picker]}
                          label={s}
                          value={s}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}> Instructions </Text>
                  </View>
                  <Input
                    style={[styles.picker]}
                    // textStyle={ExtStyle.multiLineInputStyle}
                    onChangeTheText={val => console.log('')}
                    value={instructionVal}
                  />
                </View>

                <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}>Stakeholder </Text>
                  </View>
                  <View style={[styles.inputStyle2, styles.picker, { paddingBottom: 15 }]}>
                    <Picker
                      style={[styles.picker]}
                      selectedValue={proposalID}
                      onValueChange={id => this.setState({ proposalID: id })}
                    >
                      {proposals.map((s, i) => (
                        <Picker.Item
                          key={i}
                          style={[styles.inputStyle, styles.picker]}
                          label={s}
                          value={s}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>

                <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}> Set Price for successful completion </Text>
                  </View>
                  <Input
                    style={[styles.picker]}
                    multiline
                    textStyle={ExtStyle.multiLineInputStyle}
                    onChangeTheText={val => console.log('')}
                    value={instructionVal}
                  />
                </View>

                <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}>Due date </Text>
                  </View>
                  <Input
                    style={[styles.picker]}
                    // textStyle={ExtStyle.multiLineInputStyle}
                    onChangeTheText={val => console.log('')}
                    value={instructionVal}
                  />
                </View>
              </View>
            </View>
            <View style={styles.bottomButton}>
              <Button
                fn={() => addRequest()}
                text="Add Request "
                textStyle={{ color: WHITE }}
                loading={loading}
                style={styles.buttonStyle}
              />
            </View>
            <View  style ={{ flex: 1,marginTop: 10}}/>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}

