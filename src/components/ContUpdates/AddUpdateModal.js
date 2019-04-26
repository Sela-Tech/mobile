import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import { RNS3 } from 'react-native-aws3';
import ImagePicker from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';
import Box from './Box';
import { WHITE, YELLOW } from '../../utils/constants';
import ExtStyle from '../../utils/styles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: YELLOW,
    width: width / 3,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  bottomButton: {
    marginTop: '10%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#222829',
    fontSize: 14,
    fontWeight: '400',
  },
  upContainer: {
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
    justifyContent: 'center',
    height: height / 15,
  },
  mv5: {
    marginVertical: 5,
  },
  middleContainer: {
    flex: 1,
    // marginHorizontal: 10,
    marginVertical: 5,
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
    position: 'absolute',
    right: 20,
    alignItems: 'center',
  },
  addTaskText: {
    color: '#201D41',
    fontSize: 18,
    fontWeight: '400',
  },
  addTaskView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otherContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexGrow: 1,
  },
  multiLineInputStyle: {
    textAlignVertical: 'top',
    marginTop: '2%',
  },
});
const options = {
  keyPrefix: 'uploads/',
  bucket: 'iracks-dump',
  region: 'us-east-1',
  successActionStatus: 201,
};

const optionsPhoto = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
  },
};

const optionsVideo = {
  mediaType: 'video',
  videoQuality: 'medium',
  title: 'Select Video',
  storageOptions: {
    path: 'videos',
    skipBackup: true,
  },
};

const TaskButton = ({ name, fn, active }) => (
  <TouchableOpacity
    onPress={fn}
    style={[
      ExtStyle.center,
      {
        height: height / 19,
        backgroundColor: active ? YELLOW : null,
        borderRightWidth: 1,
        borderColor: '#D7DDE2',
      },
    ]}
  >
    <Text style={{ color: '#3D4851' }}>{name}</Text>
  </TouchableOpacity>
);

export default class AddUpdateModal extends Component {
  state = {
    active: 'started',
    progress: 0,
    loading: false,
  };

  changeTaskState = name => {
    if (name === 'started') {
      this.setState({ active: 'started' });
    } else if (name === 'inprogress') {
      this.setState({ active: 'inprogress' });
    } else {
      this.setState({ active: 'completed' });
    }
  };

  uploadToAWS = (file, undefined, cred) => {
    options.accessKey = cred.key;
    options.secretKey = cred.secret;

    return RNS3.put(file, options)
      .then(response => {
        if (response.status !== 201) {
          return false;
        }
        return response.body;
      })
      .catch(() => false)
      .progress(e => {
        this.setState({ progress: e.loaded / e.total });
      });
  };

  uploadFile = async (index, id) =>
    ImagePicker.launchCamera(index === 0 ? optionsPhoto : optionsVideo, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        this.setState({ expand: false });
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this.setState({ expand: false });
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        this.setState({ expand: false });
      } else {
        const source = { uri: response.uri };

        return this.setState({
          fileName: response.fileName,
          fileSource: source,
          requestId: id,
          expand: true,
          theType: index === 0 ? 'image' : 'video',
        });
      }
    });

  hideUploadProgress = () => {
    this.setState({ submissionLoading: false });
    this.props.toggleModal();
  };

  render() {
    const { visibility, progress, toggleModal, submit, updateInput, comment } = this.props;

    const { active, loading } = this.state;

    if (loading) {
      return (
        <View style={ExtStyle.center}>
          <Progress.Pie progress={progress} color={YELLOW} size={height / 4.5} />
          <View style={{ marginTop: 5 }}>
            <Button
              style={{ width: width / 2 }}
              textColor={WHITE}
              text="Minimize"
              fn={() => this.hideUploadProgress()}
            />
          </View>
        </View>
      );
    }

    return (
      <Modal
        style={{
          margin: 0,
          marginTop: height / 6,
        }}
        isVisible={visibility}
      >
        <KeyboardAvoidingView enabled style={ExtStyle.flex1}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.upContainer}>
              <View style={styles.addTaskView}>
                <Text style={styles.addTaskText}> Task Update </Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal()}>
                <Image source={require('../../../assets/close_icon.png')} />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15 }}>
              <View style={{ marginTop: '5%', flex: 1 }}>
                <View>
                  <Text style={{ color: '#222829' }}> Current task status </Text>
                </View>
                <View
                  style={{
                    marginVertical: 5,
                    flexDirection: 'row',
                    width: '100%',
                    borderRadius: 7,
                    borderColor: '#D7DDE2',
                    borderWidth: 1,
                  }}
                >
                  <TaskButton
                    active={active === 'started'}
                    fn={val => this.changeTaskState('started')}
                    name="Not Started"
                  />

                  <TaskButton
                    fn={val => this.changeTaskState('inprogress')}
                    active={active === 'inprogress'}
                    name="In progress"
                  />

                  <TaskButton
                    fn={val => this.changeTaskState('active')}
                    active={active === 'completed'}
                    name="Completed"
                  />
                </View>
              </View>

              <View style={styles.middleContainer}>
                <View>
                  <View style={styles.mv5}>
                    <Text style={styles.textStyle}> Comment on project status </Text>
                  </View>
                  <Input
                    style={[styles.inputStyle, { height: height / 8 }]}
                    multiline
                    textStyle={styles.multiLineInputStyle}
                    onChangeTheText={comment => updateInput(comment, 'comment')}
                    value={comment}
                  />
                </View>
              </View>

              <View style={{ flex: 7 }}>
                <View style={{ flex: 1 }}>
                  <View>
                    <Text style={{ color: '#222829', fontSize: 14 }}>Supporting evidence </Text>
                  </View>
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ color: '#94979A' }}>
                      Upload videos, photos and any other document to support your task status claim
                    </Text>
                  </View>
                </View>

                <View style={{ flex: 4 }}>
                  <Box empty={false} fn={() => console.log('')}
                  />
                </View>
              </View>

              <View style={styles.bottomButton}>
                <Button
                  fn={() => submit()}
                  text="Send"
                  textStyle={{ color: WHITE }}
                  loading={loading}
                  style={styles.buttonStyle}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  }
}
