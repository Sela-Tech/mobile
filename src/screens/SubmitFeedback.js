import React, { Fragment, Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Header } from 'native-base';
import io from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Text from '../components/Text';
import { isAndroid } from '../utils/helpers';
import { YELLOW, SOCKET_URL } from '../utils/constants';

const { width } = Dimensions.get('window');

const options = {
  title: 'Take Picture',
  customButtons: [{ name: 'sela', title: 'Choose Photo ' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};


const initialText =
  'Upload evidence of completion of this task.This can be a photo or video.Ensure you are at the project site before proceeding.';

const response = ' Select  1 to add more evidence  or  2 for terminate. ';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: 0,
    height: 80,
    width,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    elevation: isAndroid ? 6 : 2,
    shadowOpacity: isAndroid ? 0.5 : 0.1,
    shadowRadius: isAndroid ? 2 : 1,
    shadowOffset: {
      height: isAndroid ? 10 : 2,
      width: isAndroid ? 10 : 2,
    },
  },
  floatingButton: {
    backgroundColor: YELLOW,
    position: 'absolute',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingTop: Constants.statusBarHeight / 2,
  },
  toggleButton: {
    flex: 0.25,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    paddingBottom: 5,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 0.12,
    flexDirection: 'row',
  },
  bottomButton: {
    flex: 0.3,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBottom: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerTopBottom: {
    width: '50%',
    height: '100%',
  },
  innerTopButtonBottom: {
    height: '100%',
    width: '100%',
    backgroundColor: YELLOW,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class SubmitFeedback extends Component {
  static navigationOptions = () => ({
    header: (
      <View style={styles.header}>
        <View
          style={{
            justifyContent: 'center',
            paddingLeft: '5%',
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image source={require('../../assets/img/blackback.png')} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            left: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>Submit Update</Text>
        </View>
      </View>
    ),
  });
  constructor(props) {
    super(props);
    // this.socke = io(SOCKET_URL, {
    //   jsonp: false,
    //   // transports: ['websocket'],
    //   // transports: ['websocket'],
    // });
    // const socket = this.socke;

    // this.socke.on('connect', (socet) => {
    //   // console.log('djdjdjdj', socket)
    //   // console.log('jdjdjdj', data)
    //   // socket.on('connected',)
    //   this.socke.on('connected', (data) => {
    //     console.log('tette', data)
    //     //   })
    //   });
    // })
    this.state = {
      hideHeader: false,
      openCamera: false,
      videoStarted: false,
      flash: 'off',
      autoFocus: 'on',
      messages: [
        {
          _id: Math.round(Math.random() * 1000000).toString(),
          text: '',
          createdAt: new Date(),
          user: {
            _id: '2',
            name: 'Admin',
            avatar: require('../../assets/goldlogo.png'),
          },
          text: initialText.trim(' '),
          sent: true,
          received: true,
        },
      ],
      step: 0,
      showBottomButton: false,
    };
  }


  // CONST socket = io(BASE_URL, {
  //   transports: ['websocket'],
  // });

  componentDidMount() {
    // const socket = this.socke;

    // socket.on('connect', (socet) => {
    //   // console.log('djdjdjdj', socket)
    //   // console.log('jdjdjdj', data)
    //   // socket.on('connected',)
    //   socket.on('connected', (data) => {
    //     console.log('tette', data)
    //     //   })
    //   });
    // })

    // socket.on('connected', (data) => {
    //   console.log('tette', data)
    //   //   })
    // });
  }

  onSend = (messages = []) => {
    let { step } = this.state;
    step += 1;
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [
        { ...messages[0], sent: true, received: true },
      ]),
      step,
    }));
  };

  snap = async () => {

    const { step } = this.state;
    ImagePicker.launchCamera(options, (resp) => {

      const messages = [
        {
          _id: Math.round(Math.random() * 1000000).toString(),
          text: '',
          createdAt: new Date(),
          image: resp.uri,
          sent: true,
          received: true,
          user: {
            _id: 1,
            name: 'Admin',
          },
        }
      ];
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, [
          { ...messages[0], sent: true, received: true },
        ]),
        step,
        showBottomButton: true,
        openCamera: false,
      }));
      const newMessages = [
        {
          _id: Math.round(Math.random() * 1000000).toString(),
          text: response,
          createdAt: new Date(),
          sent: true,
          received: true,
          user: {
            _id: 2,
            name: 'Admidn',
            avatar: require('../../assets/goldlogo.png'),
          },
        },
      ];
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, newMessages),
      }))
    });
  };

  updateFeedback = async val => {
    this.setState(prevstate => ({
      hideHeader: !prevstate.hideHeader,
      videoStarted: !prevstate.videoStarted,
      showBottomButton: true,
    }));
    if (val === 1) {
      await this.snap();
    } else {
      await this.takeVideo();
    }
    let { step } = this.state;
    step += 1;
    this.setState(previousState => ({
      step,
      videoStarted: false,
      hideHeader: false,
    }));
  };

  takeVideo = async () => {
    // const { videoStarted } = this.state;
    // if (videoStarted) {
    //   if (!this.camera) return;
    //   this.setState({ videoStarted: false });
    //   await this.camera.stopRecording();
    // }

    // let { step } = this.state;
    // step += 1;
    // if (this.camera) {
    //   try {
    //     // this.setState({ videoStarted: false });
    //     const video = await this.camera.recordAsync();
    //     const messages = [
    //       {
    //         _id: Math.round(Math.random() * 1000000).toString(), // .toString(),
    //         text: '',
    //         user: {
    //           //   _id: '1',
    //           //   name: 'User',
    //         },
    //         createdAt: new Date(),
    //         image: video.uri,
    //         sent: true,
    //         received: true,
    //       },
    //     ];
    //     this.setState(previousState => ({
    //       messages: GiftedChat.append(previousState.messages, [
    //         { ...messages[0], ...messages[1], sent: true, received: true },
    //       ]),
    //       step,
    //       openCamera: false,
    //       videoStarted: false,
    //     }));
    //   } catch (error) {
    //     this.setState({ error: error.message, videoStarted: false });
    //   }
    // } else {
    //   console.log('not working');
    //   this.setState({
    //     error: 'Request failed',
    //   });
    // }
  };

  sendReponse = async text => {
    let { step } = this.state;
    step += 1;
    const messages = [
      {
        _id: Math.round(Math.random() * 1000000).toString(),
        text,
        createdAt: new Date(),
        sent: true,
        received: true,
        user: {
          _id: 1,
          name: 'user',
        },
      },
    ];
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [
        { ...messages[0], sent: true, received: true },
      ]),
      step,
    }));
    if (text === 1) {
      await this.updateFeedback(text);
    } else {
      this.setState({ openCamera: false });
    }
  };

  // renderTopBar = () => <View style={styles.topBar} />;

  // renderBottomBar = () => {
  //   const { videoStarted } = this.state;
  //   return (
  //     <View style={styles.bottomBar}>
  //       <View style={{ flex: 0.4 }}>
  //         <TouchableOpacity
  //           onPress={this.updateFeedback(1)}
  //           onLongPress={this.updateFeedback(2)}
  //           style={{ alignSelf: 'center' }}
  //         >
  //           <Fragment>
  //             <Text>{!videoStarted ? 'video' : 'picture'}</Text>
  //             <Ionicons
  //               name="ios-radio-button-on"
  //               size={70}
  //               color={!videoStarted ? 'white' : 'red'}
  //             />
  //           </Fragment>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // };

  renderLeftIcon = () => {
    const { showBottomButton } = this.state;
    return (
      <Fragment>
        {showBottomButton ? (
          <View style={styles.topBottom}>
            <View style={styles.innerTopBottom}>
              <TouchableOpacity
                style={[styles.innerTopButtonBottom, { backgroundColor: YELLOW }]}
                onPress={() => this.sendReponse(1)}
              >
                <Text>1</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.innerTopBottom}>
              <TouchableOpacity
                style={[styles.innerTopButtonBottom, { backgroundColor: 'blue' }]}
                onPress={() => this.sendReponse(2)}
              >
                <Text>2</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
            <View style={styles.topBottom}>
              <View style={styles.floatingButton}>
                <TouchableOpacity
                  onPress={() => this.snap()}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image source={require('../../assets/img/camera.png')} />
                </TouchableOpacity>
              </View>
            </View>
          )}
      </Fragment>
    );
  };

  render() {
    const { messages, openCamera, type, flash, autoFocus, hideHeader } = this.state;
    return (
      <View style={styles.container}>
        <Fragment>
          {!hideHeader ? (
            <Header>
              <View style={styles.header}>
                <View
                  style={{
                    justifyContent: 'center',
                    paddingLeft: '5%',
                  }}
                >
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={require('../../assets/img/blackback.png')} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    left: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 20 }}>Submit Update</Text>
                </View>
              </View>
            </Header>
          ) : null}
        </Fragment>

        <Fragment>
          <Fragment>
            <GiftedChat
              messages={messages}
              onSend={this.onSend}
              renderActions={this.renderLeftIcon}
              user={{
                _id: 1,
              }}
            />
          </Fragment>
        </Fragment>
      </View>
    );
  }
}
