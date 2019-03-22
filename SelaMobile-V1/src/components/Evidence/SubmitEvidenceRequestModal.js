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
import { createEvidenceRequest } from '../../utils/api';
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
    color: '#696F74',
    fontSize: 14,
    fontWeight: '400',
  },
  upContainer: {
    height: height / 10,
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
    borderColor: '#B1BAD2',
    height: height / 15,
    width: '100%',
  },
  centerUpText: {
    flex: 1,
    alignItems: 'center',
  },
  closeButton: {
    // flex: 1,
    position: 'absolute',
    right: 20,
    // alignItems: 'flex-end',
  },
  addTaskText: {
    color: '#0A2C56',
    fontWeight: '400',
    fontSize: 18,
  },
  addTaskView: {
    flex: 1,
    alignItems: 'center',
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

export default class EvidenceRequestModal extends Component {
  state = {
    level: true, // default level === task
  };

  toggleLevelRequest = val => {
    if (val === 'task') {
      this.setState({ level: true });
    } else {
      this.setState({ level: false });
    }
  };

  render() {
    const {
      visibility,
      toggleModal,
      updateInput,
      loading,
      data,
      theState,
      submitForm,
    } = this.props;
    const {
      // instructionVal,
      level,
      title,
    } = this.state;
    return (
      <Modal isVisible={visibility}>
        <KeyboardAvoidingView enabled style={ExtStyle.flex1}>
          <ScrollView style={styles.container} contentContainerStyle={[ExtStyle.flexGrow]}>
            <View style={styles.upContainer}>
              <View style={styles.addTaskView}>
                <Text style={styles.addTaskText}>Submit</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal()}>
                <Image source={require('../../../assets/close_icon.png')} />
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text>{data.instruction} </Text>
            </View>
            <View style={styles.middleContainer}>
              <View style={{ flex: 1 }}>
                {data &&
                  data.fields &&
                  data.fields.map(c => (
                    <Fragment key={c._id}>
                      {c.title === 'Date' ? null : (
                        <View stle={{ marginVertical: 5 }}>
                          <View style={styles.mv5}>
                            <Text style={styles.textStyle}> {c.title} </Text>
                          </View>
                          <Input
                            value={theState[c.title]}
                            style={styles.inputStyle}
                            numb={!(c && c.responseType === 'Text')}
                            onChangeTheText={val => updateInput(c.title, val)}
                          />
                        </View>
                      )}
                    </Fragment>
                  ))}

                <View />
              </View>
            </View>
            <View style={styles.bottomButton}>
              <Button
                fn={() => submitForm(null, data._id)}
                text="Send"
                textStyle={{ color: WHITE }}
                loading={loading}
                style={styles.buttonStyle}
              />
            </View>
            <View style={{ flex: 1, marginTop: 10 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}
