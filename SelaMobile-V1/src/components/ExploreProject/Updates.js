import React, { Component, Fragment } from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
import Modal from 'react-native-modal';
import Text from '../Text';
import Tag from '../Tag';
import B from '../BoldText';
import SubmitEvidenceRequestModal from '../Evidence/SubmitEvidenceRequestModal';
import SpinnerOverlay from '../SpinnerOverlay';
import EvalSubmission from './EvalSubmission';
import { evidenceRequestSubmission, uploadToAWS } from '../../utils/api';
import { projectStatusTextColor } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';
import BigImage from './Image';

const { height, width } = Dimensions.get('window');

const keyExtractor = item => item.id.toString();

const renderItem = item => <EvalSubmission imgSource={item.item.source} markedStatus />;

const images = [
  {
    source: require('../../../assets/img/cleanup/cleanup_3.jpg'),
    id: 1,
  },
  {
    source: require('../../../assets/img/cleanup/cleanup_2.jpg'),
    id: 2,
  },
  {
    source: require('../../../assets/img/cleanup/cleanup_4.jpg'),
    id: 3,
  },
];

const factoryImages = [
  {
    source: require('../../../assets/img/cleanup/factory.jpg'),
    id: 1,
  },
  {
    source: require('../../../assets/img/cleanup/factory_1.jpeg'),
    id: 2,
  },
  {
    source: require('../../../assets/img/cleanup/factory_2.jpg'),
    id: 3,
  },
  {
    source: require('../../../assets/img/cleanup/factory_4.jpg'),
    id: 4,
  },
];

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    // path: 'images',
  },
};

const optionsVideo = {
  mediaType: 'video',
  videoQuality: 'high',
  durationLimit: 10,
  takePhotoButtonTitle: null, // 'Take video...', //bug at taking video with camera so far 27/10/2018
  title: 'Select Video',
  // noData,maxWidth and maxHeight shorten time for ImportPhoto to return image
  noData: true,
  maxWidth: 1000, // speeds up compressImage to almost no time
  maxHeight: 1000, // speeds up compressImage to almost no time
  storageOptions: {
    path: 'videos',
    skipBackup: true,
  },
};

const styles = StyleSheet.create({
  notFunderContainer: {
    // flex: 1,
    marginBottom: 10,
    height: height / 7,
    borderBottomColor: '#B1BAD2',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  container: {
    flex: 1,
    marginBottom: 10,
    // height: height / 7,
    borderBottomColor: '#B1BAD2',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
});

class Updates extends Component {
  state = {
    fileName: '',
    fileSource: '',
    expand: false,
    theType: null,
    submissionLoading: false,
    tableModal: false,
  };

  uploadFile = async (index, id) =>
    ImagePicker.launchCamera(index === 0 ? options : optionsVideo, response => {
      // Same code as in above section!
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

  submitEvidence = async (source, id) => {
    const { fieldsData } = this.state;

    const data = {
      evidenceRequestId: id,
      file: source,
      fields: [],
    };

    if (source === null) {
      const newData = fieldsData
        .filter(c => c && c.title !== 'Date')
        .map(c => {
          c.value = this.state[c && c.title];
          return c;
        });

      data.fields = newData;
      this.toggleModal();
    }

    try {
      const resp = await evidenceRequestSubmission(data);
      this.setState({ submissionLoading: false });

      alert('Evidence saved');
    } catch (err) {
      this.setState({ error: err.message, submissionLoading: false });
    }
  };

  submit = async (val, id) => {
    if (val === 'image') {
      this.uploadFile(0, id);
    } else if (val === 'video') {
      await this.uploadFile(1, id);
    } else {
      this.setState({
        fieldsData: this.props.allData.fields,
      });
      this.props.allData.fields.map(c => {
        this.setState({ [c.title]: '' });
      });
      this.toggleModal();
    }
  };

  submission = async val => {
    this.setState({ loading: true, expand: false });
    const cred = this.props && this.props.credentials && this.props.credentials.credentials;

    if (val === 'image') {
      const { fileName, fileSource, requestId } = this.state;
      const fileInfo = {
        uri: fileSource.uri,
        name: fileName,
        type: 'image/png',
      };
      this.setState({ submissionLoading: true });
      const resp = await uploadToAWS(fileInfo, null, cred);
      await this.submitEvidence(resp.postResponse.location, requestId);
    } else if (val === 'video') {
      const { fileName, fileSource, requestId } = this.state;

      const fileInfo = {
        uri: fileSource.uri,
        name: fileName,
        type: 'image/png',
      };
      this.setState({ submissionLoading: true });
      const resp = await uploadToAWS(fileInfo, null, cred);
      await this.submitEvidence(resp.postResponse.location, requestId);
    } else {
      alert('table submission');
      // this.toggleModal();
    }
  };

  displayPicture = () => {
    this.setState({ expand: false });
  };

  updateInput = (name, value) => {
    this.setState({ [name]: value });
  };

  handlePress = buttonIndex => {
    if (buttonIndex === 0) {
      this.uploadFile(0);
    } else if (buttonIndex == 1) {
      this.uploadFile(1);
    } else {
      console.log('');
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  toggleModal = () => this.setState(prevState => ({ tableModal: !prevState.tableModal }));

  render() {
    const { allData, projectName, title, statusText, text, userRole, dataType } = this.props;

    const { fileSource, theType, expand, submissionLoading, tableModal } = this.state;

    if (tableModal) {
      return (
        <SubmitEvidenceRequestModal
          visibility={tableModal}
          toggleModal={this.toggleModal}
          updateInput={this.updateInput}
          data={allData}
          submitForm={this.submitEvidence}
          theState={this.state}
        />
      );
    }

    if (expand) {
      return (
        <Modal isVisible>
          <View
            style={{
              flex: 1,
              borderRadius: 10,
            }}
          />
          <BigImage
            fn={() => this.displayPicture()}
            imageSource={fileSource}
            btn
            btnFn={() => this.submission(theType)}
          />
        </Modal>
      );
    }
    if (submissionLoading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SpinnerOverlay loading={submissionLoading} />
        </View>
      );
    }
    return (
      <View style={userRole !== 'funder' ? styles.notFunderContainer : styles.container}>
        <View>
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title="Which operation would you like to perform ?"
            options={['Upload Image', 'Upload video', 'Fill form', 'Cancel']}
            cancelButtonIndex={3}
            destructiveButtonIndex={3}
            onPress={this.handlePress}
          />
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 15, flex: 1 }}>
          <View style={{ flex: 2 }}>
            <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '500' }}>Status </Text>
          </View>
          <View
            style={{
              flex: 3,
              marginRight: 5,
              alignItems: 'flex-end',
              // justifyContent: userRole === 'funder' ? 'flex-start' : 'center',
            }}
          >
            <Tag
              textColor={WHITE}
              text={statusText}
              viewColor={projectStatusTextColor(statusText)}
            />
          </View>
          <Fragment>
            {userRole === 'funder' ? null : (
              <Fragment>
                {dataType === 'table' && statusText === 'Submitted' ? null : (
                  <Fragment>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={() => this.submit(dataType, allData._id)}>
                        <Image source={require('../../../assets/yellow_plus.png')} />
                      </TouchableOpacity>
                    </View>
                  </Fragment>
                )}
              </Fragment>
            )}
          </Fragment>
        </View>
        <View style={{ flex: 4, paddingTop: 3 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '500' }}>Task Name: </Text>
            </View>
            <View
              style={{
                width: width / 1.2,
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '300' }}>{title} </Text>
            </View>
          </View>
          <View style={{ marginTop: '2%' }}>
            <Text style={{ color: '#222829' }}>{text}</Text>
          </View>
        </View>
        <View style={userRole === 'funder' ? { flex: 6 } : null}>
          {userRole === 'funder' ? (
            <Fragment>
              {allData && allData.submission && allData.submission.length === 0 ? (
                <View>
                  <Text> No Submission yet </Text>
                </View>
              ) : (
                <View>
                  <View>
                    <B color="#201D41"> Evaluation Submissions</B>
                  </View>
                  <FlatList
                    style={{ paddingTop: 10 }}
                    data={projectName === 'Aba Factory construction' ? factoryImages : images}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={keyExtractor}
                    horizontal
                    renderItem={renderItem}
                  />
                </View>
              )}
            </Fragment>
          ) : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  credentials: state.credentials,
});

export default connect(mapStateToProps)(Updates);
