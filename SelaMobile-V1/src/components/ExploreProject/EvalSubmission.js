import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { CheckBox } from 'native-base';
import Modal from 'react-native-modal';
import Image from '../ProgressiveImage';
import BigImage from './Image';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    height: height / 7,
    width: width / 4,
    // width: '100%',
    borderRadius: 10,
  },
  imageContainer: {
    marginHorizontal: 10,
    height: height / 7,
    width: width / 4,
    // width: '100%',
    borderRadius: 10,
  },
  checkedStatus: {
    position: 'absolute',
    right: 1,
    top: -2,
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
          <View
            style={{
              flex: 1,
              borderRadius: 10,
            }}
          />
          <BigImage fn={() => this.displayPicture()} imageSource={imgSource} />
        </Modal>
      );
    }
    return (
      <TouchableOpacity style={{ marginLeft: 8 }} onPress={() => this.displayPicture()}>
        <Image
          style={styles.container}
          imageStyle={styles.imageContainer}
          source={imgSource}
          imageStyle={{ borderRadius: 10 }}
        />
      </TouchableOpacity>
    );
  }
}
