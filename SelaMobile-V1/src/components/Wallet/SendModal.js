import React from 'react';
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
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';
import { WHITE } from '../../utils/constants';
import ExtStyle from '../../utils/styles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#B1BAD2',
    width: width / 3,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    // backgroundColor: 'red',
  },
  bottomButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#3D4851',
    fontSize: 14,
    fontWeight: '400',
  },
  upContainer: {
    flex: 1,
    backgroundColor: '#F5F5F8',
  },
  mv5: {
    marginVertical: 5,
  },
  middleContainer: {
    flex: 4,
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
    // flex: 1,
    // alignItems: 'flex-end',
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
  },
  addTaskText: {
    color: '#201D41',
    fontSize: 18,
  },
  addTaskView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    borderColor: '#B1BAD2',
    borderRadius: 5,
    borderWidth: 1,
    height: height / 13,
  },
});

const SendModal = ({ visibility, toggleModal, sendMoney, updateInput, data, loading, projectStakeholders }) => {
  const { amountToBeSent, remarks, receiverID } = data;
  return (
    <Modal isVisible={visibility}>
      <KeyboardAvoidingView enabled style={ExtStyle.flex1}>
        <ScrollView style={styles.container} contentContainerStyle={ExtStyle.flexGrow}>
          <View style={styles.upContainer}>
            <View style={styles.otherContainer}>
              <View style={styles.addTaskView}>
                <Text style={styles.addTaskText}>Send </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal()}>
                <Image source={require('../../../assets/close_icon.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.middleContainer}>
            <View>
              <View style={styles.mv5}>
                <Text style={styles.textStyle}>Select Stakeholder</Text>
              </View>
              <View style={[styles.inputStyle, styles.picker, { paddingBottom: 15 }]}>
                <Picker
                  style={[styles.picker]}
                  selectedValue={receiverID}
                  onValueChange={receiverID => updateInput(receiverID, 'receiverID')}
                >
                  { projectStakeholders && projectStakeholders.map((s, i) => (
                    <Picker.Item
                      key={i}
                      style={[styles.inputStyle, styles.picker]}
                      label={s.user.information.firstName + " " + s.user.information.lastName}
                      value={s.user.information._id}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <View style={styles.mv5}>
                <Text style={styles.textStyle}> Amount</Text>
              </View>
              <Input
                numb
                style={styles.inputStyle}
                onChangeTheText={amountToBeSent => updateInput(amountToBeSent, 'amountToBeSent')}
                value={amountToBeSent}
              />
            </View>

            <View>
              <View style={styles.mv5}>
                <Text style={styles.textStyle}> Remarks </Text>
              </View>
              <Input
                style={[styles.inputStyle, { height: height / 6 }]}
                multiline
                textStyle={ExtStyle.multiLineInputStyle}
                onChangeTheText={remarks => updateInput(remarks, 'remarks')}
                value={remarks}
              />
            </View>
          </View>
          <View style={styles.bottomButton}>
            <Button
              fn={() => sendMoney()}
              text="Send"
              textStyle={{ color: WHITE }}
              loading={loading}
              style={styles.buttonStyle}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SendModal;
