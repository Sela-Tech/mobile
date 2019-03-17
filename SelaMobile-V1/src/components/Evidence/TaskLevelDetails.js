import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from 'react-native';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import Text from '../Text';
import Button from '../Button';
import Input from '../Input';
import { WHITE, YELLOW } from '../../utils/constants';
import ExtStyle from '../../utils/styles';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  upContainer: {
    // flex: 1,
    height: height / 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    borderColor: '#FFFFFF',
    borderWidth: 3,
    height: width / 12,
    width: width / 12,
    borderRadius: width / 6,
  },
  media: {
    height: height / 3.2,
    // flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
  },
  addTaskView: {
    flex: 3,
    alignItems: 'center',
  },
  addTaskText: {
    color: '#0A2C56',
    fontWeight: 'bold',
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
export default class TaskRequestModal extends Component {
  state = {
    loading: false,
    fieldTitle: '',
    responseType: '',
  };

  render() {
    const { loading, fieldTitle, responseType } = this.state;
    const { visibility, toggleModal } = this.props;
    return (
      <Modal
        style={{
          borderRadius: 30,
          margin: 0,
          // borderTopLeftRadius: 10,
          // borderTopRightRadius: 10,
        }}
        isVisible={visibility}
      >
        <ScrollView
          style={{
            marginTop: '25%',

            // marginBottom: 10,

            // width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
          contentContainerStyle={{
            // flexGrow: 1,
            backgroundColor: WHITE,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // height: height / 1.5,
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <View style={styles.upContainer}>
              <View style={styles.addTaskView}>
                <Text style={styles.addTaskText}>Purchase and install electrical poles</Text>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={() => toggleModal()}>
                <Image source={require('../../../assets/close_icon.png')} />
              </TouchableOpacity>
            </View>
            <View>
              <View style={{ flex: 2, marginVertical: 10 }}>
                <View>
                  <Text style={{ fontSize: 16, color: '#0A2C56' }}> Requested</Text>
                </View>

                <View
                  style={{
                    marginVertical: 10,
                    flexGrow: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    // marginLeft: 5,
                    // justifyContent: 'space-between',
                    marginTop: 15,
                    paddingBottom: '10%',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ marginTop: 15, width: width / 2.2 }}>
                    <TouchableOpacity
                      style={{
                        height: height / 3.2,
                        width: width / 2.2,
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                      }}
                    >
                      <View style={{ height: height / 6.4, width: width / 4.4 }}>
                        <Image
                          style={{ height: height / 6.4, width: width / 4.4 }}
                          source={require('../../../assets/img/cleanup/factory.jpg')}
                        />
                      </View>
                      <View style={{ height: height / 6.4, width: width / 4.4 }}>
                        <Image
                          style={{ height: height / 6.4, width: width / 4.4 }}
                          source={require('../../../assets/class.png')}
                        />
                      </View>
                      <View style={{ height: height / 6.4, width: width / 4.4 }}>
                        <Image
                          style={{ height: height / 6.4, width: width / 4.4 }}
                          source={require('../../../assets/img/cleanup/cleanup_22.jpg')}
                        />
                      </View>
                      <View style={{ height: height / 6.4, width: width / 4.4 }}>
                        <Image
                          style={{ height: height / 6.4, width: width / 4.4 }}
                          source={require('../../../assets/img/cleanup/cleanup_4.jpg')}
                        />
                      </View>
                    </TouchableOpacity>
                    <View>
                      <View>
                        <Text style={{ color: '#696F74' }}> Date of last submission </Text>
                      </View>

                      <View>
                        <Text style={{ color: '#0A2C56' }}> Request title </Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <View style={{}}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/woman1.png')}
                          />
                        </View>
                        <View style={{ marginLeft: -15 }}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/img/woman.png')}
                          />
                        </View>
                        <View style={{ marginLeft: -15 }}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/person.png')}
                          />
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={{ marginTop: 15, width: width / 2.2 }}>
                    <Video
                      ref={Video => {
                        this.video = Video;
                      }}
                      source={{ uri: 'https://www.youtube.com/watch?v=lTTajzrSkCw' }} // Can be a URL or a local file.
                      style={styles.media}
                      rate={1.0}
                      paused={this.state.paused}
                      volume={1.0}
                      muted={this.state.muted}
                      resizeMode={this.state.resizeMode}
                      controls
                      onLoad={this.onLoad}
                      onProgress={this.onProgress}
                      onEnd={this.onEnd}
                      onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                      onAudioFocusChanged={this.onAudioFocusChanged}
                      repeat={false}
                    />
                    <View>
                      <View>
                        <Text style={{ color: '#696F74' }}> Date of last submission </Text>
                      </View>

                      <View>
                        <Text style={{ color: '#0A2C56' }}> Request title </Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <View style={{}}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/woman1.png')}
                          />
                        </View>
                        <View style={{ marginLeft: -15 }}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/img/woman.png')}
                          />
                        </View>
                        <View style={{ marginLeft: -15 }}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/person.png')}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={{ marginTop: 15, width: width / 2.2 }}>
                    <TouchableOpacity style={{ height: height / 3.2, width: width / 2.2 }}>
                      <Image
                        style={{ height: height / 3.2, width: width / 2.2 }}
                        source={require('../../../assets/table-data.png')}
                      />
                    </TouchableOpacity>
                    <View>
                      <View>
                        <Text style={{ color: '#696F74' }}> Date of last submission </Text>
                      </View>

                      <View>
                        <Text style={{ color: '#0A2C56' }}> Request title </Text>
                      </View>

                      <View style={{ flexDirection: 'row' }}>
                        <View style={{}}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/woman1.png')}
                          />
                        </View>
                        <View style={{ marginLeft: -15 }}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/img/woman.png')}
                          />
                        </View>
                        <View style={{ marginLeft: -15 }}>
                          <Image
                            style={styles.imageStyle}
                            source={require('../../../assets/person.png')}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }
}
