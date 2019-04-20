import React, { Component } from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import ImageN from '../ProgressiveImage';
import BigImage from './Image';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height / 7,
    width: width / 4,
    borderRadius: 10,
  },
  imageContainer: {
    height: height / 7,
    width: width / 4,
    borderRadius: 10,
  },
  checkedStatus: {
    position: 'absolute',
    right: 1,
    top: -2,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 10,
  },
});

export default class EvalSubmission extends Component {
  state = {
    expand: false,
  };

  displayPicture = () => {
    this.setState(prevState => ({ expand: !prevState.expand }));
  };

  render() {
    const { expand } = this.state;
    const { imgSource, markedStatus } = this.props;

    if (expand) {
      return (
        <Modal isVisible>
          <View style={styles.modalContainer} />
          <BigImage fn={() => this.displayPicture()} imageSource={imgSource} />
        </Modal>
      );
    }
    return (
      <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => this.displayPicture()}>
        <ImageN style={styles.container} imageStyle={styles.imageContainer} source={imgSource} />
      </TouchableOpacity>
    );
  }
}
