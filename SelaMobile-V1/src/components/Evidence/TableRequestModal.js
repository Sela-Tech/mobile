import React, { Component } from 'react';
import { View, Picker, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';
import { WHITE, YELLOW } from '../../utils/constants';
import ExtStyle from '../../utils/styles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  upContainer: {
    flex: 1,
    height: height / 10,
    backgroundColor: '#F5F5F8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addTaskView: {
    flex: 2,
    alignItems: 'flex-end',
  },
  addTaskText: {
    color: '#201D41',
    fontSize: 18,
  },
  closeButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bottomButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonStyle: {
    backgroundColor: YELLOW,
    width: width / 2,
  },
  input: {
    borderColor: '#B1BAD2',
    borderRadius: 5,
    borderWidth: 1,
    height: height / 13,
    width: '100%',
  },
  picker: {
    borderColor: '#B1BAD2',
    borderRadius: 5,
    borderWidth: 1,
    height: height / 13,
    width: '100%',
  },
  textStyle: {
    fontSize: 16,
    color: '#3D4851',
  },
});
export default class TableeRequestModal extends Component {
  state = {
    loading: false,
    fieldTitle: '',
    responseType: '',
  };

  render() {
    const { loading, toggleModal, fieldTitle, responseType } = this.state;
    const { addRequest, visibility } = this.props;
    return (
      <Modal isVisible={visibility}>
        <View style={{ backgroundColor: WHITE, marginBottom: 10, height: height / 1.5 }}>
          <View style={styles.upContainer}>
            <View style={styles.addTaskView}>
              <Text style={styles.addTaskText}>Add Evidence Request</Text>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal()}>
              <Image source={require('../../../assets/close_icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 15, flex: 3, paddingHorizontal: 10 }}>
            <View style={styles.mv5}>
              <Text style={styles.textStyle}> Table </Text>
            </View>
            <View style={{ flex: 1, marginTop: 5, justifyContent: 'space-around' }}>
              <Input
                text="Field Title"
                style={[styles.input]}
                placeHolderColor="#3D4851"
                textStyle={ExtStyle.multiLineInputStyle}
                onChangeTheText={val => console.log('')}
                value={fieldTitle}
              />
              <View style={[styles.input, styles.picker, { paddingBottom: 15 }]}>
                <Picker
                  style={[styles.picker]}
                  selectedValue={responseType}
                  onValueChange={responseType => this.setState({ responseType })}
                >
                  {[].map((s, i) => (
                    <Picker.Item
                      key={i}
                      style={[styles.inputStyle, styles.picker]}
                      label={s}
                      value={s}
                    />
                  ))}
                </Picker>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  height: height / 13,
                  borderRadius: 5,
                  borderColor: '#B1BAD2',
                }}
              >
                <View>
                  <Image source={require('../../../assets/selectImage.png')} />
                </View>
                <View>
                  <Text> New Field</Text>
                </View>
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
        </View>
      </Modal>
    );
  }
}
