import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Text from '../Text';
import Tag from '../Tag';
import { YELLOW, WHITE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default class UserId extends Component {

  state = {
    avatarSource: require('../../../assets/img/man.png'),
  };
  selectImage = async () => {
    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        this.setState({ error: 'Image upload failed' });
      } else if (response.error) {
        this.setState({ error: 'Image upload failed' });
      } else if (response.customButton) {
        this.setState({ error: 'Image upload failed' });
      } else {
        const avatarSource = { uri: response.uri };
        this.setState({
          avatarSource,
        });
      }
    });
  };
  render() {
    const { settings, userType, userName, verificationStatus } = this.props;
    const { avatarSource } = this.state;

    return (
      <View style={styles.container}>
        {
          settings ?
            (
              <TouchableOpacity
                onPress={() => this.selectImage()}
                style={styles.imgStyle}>
                <Image source={avatarSource} style={styles.imgStyle} />
              </TouchableOpacity>
            ) : (
              <View style={styles.imgStyle}>
                <Image source={avatarSource} style={styles.imgStyle} />
              </View>
            )
        }

        <View style={{ alignItems: 'center', paddingTop: 5 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: YELLOW, fontWeight: '400' }}> {userName} </Text>
            <Text> {userType} </Text>
          </View>
          {settings ? (
            <View style={{ paddingTop: 5 }}>
              <Tag text={verificationStatus} viewColor="#BC1717" textColor={WHITE} />
            </View>
          ) : null}
        </View>
      </View>
    )
  }
};

