import React, { Component, Fragment } from 'react';
import { View, FlatList, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import { RNS3 } from 'react-native-aws3';
import * as Progress from 'react-native-progress';
import { getUserTransactions } from '../../../actions/wallet';
import Text from '../Text';
import Tag from '../Tag';
import B from '../BoldText';
import SubmitEvidenceRequestModal from '../Evidence/SubmitEvidenceRequestModal';
import SpinnerOverlay from '../SpinnerOverlay';
import EvalSubmission from './EvalSubmission';
import { evidenceRequestSubmission } from '../../utils/api';
import { projectStatusTextColor } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';
import BigImage from './Image';


const { height, width } = Dimensions.get('window');

const keyExtractor = () => Math.floor(Math.random() * 1000000).toString();

const renderItem = item => <EvalSubmission imgSource={{ uri: item.item.evidence }} markedStatus />;

const options = {
  keyPrefix: 'uploads/',
  bucket: 'iracks-dump',
  region: 'us-east-1',
  successActionStatus: 201,
};

const options = {
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

const styles = StyleSheet.create({
  notFunderContainer: {
    // flex: 1,
    marginBottom: 10,
    height: height / 8.5,
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
    progress: 0,
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
    }

    try {
      const validateFields = data.fields.filter(c => c.value === '');

      if (validateFields.length === 0) {
        if (source === null) {
          this.toggleModal();
        }

        await evidenceRequestSubmission(data);
        this.setState({ submissionLoading: false });
        this.props.updateTask(id);

        this.props.getUserWalletTransaction();
        alert('Evidence saved');
      } else {
        alert('Please fill all fields');
      }
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

  uploadToAWS = (file, null, cred) => {
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
      .progress((e) => {
        this.setState({ progress: (e.loaded / e.total) });
        console.log('upload progress', e.loaded / e.total)
      });
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
    // this.ActionSheet.show();
  };

  toggleModal = () => this.setState(prevState => ({ tableModal: !prevState.tableModal }));

  render() {
    const { allData, projectName, title, progress, statusText, text, userRole, dataType } = this.props;

    const { fileSource, theType, expand, submissionLoading, progress, tableModal } = this.state;

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
          <Progress.Pie progress={progress} size={50} />
          {/* <SpinnerOverlay loading={submissionLoading} /> */}
        </View>
      );
    }
    return (
      <View style={userRole !== 'funder' ? styles.notFunderContainer : styles.container}>
        <View style={{ flexDirection: 'row', paddingTop: 10, flex: 1 }}>
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
        <View style={{ flex: 4, paddingTop: 10, justifyContent: 'center' }}>
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
          {/* <View style={{ marginTop: '2%' }}>
            <Text style={{ color: '#222829' }}>{text}</Text>
          </View> */}
        </View>
        <View style={userRole === 'funder' ? { flex: 6 } : null}>
          {userRole === 'funder' ? (
            <Fragment>
              {allData && allData.submissions && allData.submissions.length === 0 ? (
                <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: '400' }}> No Submission yet </Text>
                </View>
              ) : (
                  <Fragment>
                    {allData && allData.submissions && allData.submissions.length === 0 ? (
                      <View
                        style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}
                      >
                        <Text style={{ fontWeight: '400' }}> No Submission yet </Text>
                      </View>
                    ) : (
                        <View style={{ marginBottom: 7 }}>
                          <View>
                            <B color="#201D41"> Evaluation Submissions</B>
                          </View>
                          <FlatList
                            style={{ paddingTop: 10 }}
                            data={allData.submissions.filter(c => c && c.evidence)} // Get only image submissions
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={keyExtractor}
                            horizontal
                            initialNumToRender={4}
                            renderItem={renderItem}
                            removeClippedSubviews
                            windowSize={10}
                          />
                        </View>
                      )}
                  </Fragment>
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

const mapDispatchToProps = dispatch => ({
  getUserWalletTransaction: () => dispatch(getUserTransactions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Updates);
