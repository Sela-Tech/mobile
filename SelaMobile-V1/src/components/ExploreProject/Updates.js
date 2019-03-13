import React, { Component,Fragment } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Text from '../Text';
import Tag from '../Tag';
import B from '../BoldText';
import EvalSubmission from './EvalSubmission';
import { projectStatusTextColor } from '../../utils/helpers';
import { WHITE } from '../../utils/constants';

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

export default class Updates extends Component {
  uploadFile = () => {
    // Launch Camera:
    ImagePicker.launchCamera(options, response => {
      // Same code as in above section!
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        alert('image uploaded successfully');
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  render() {
    const { projectName, title, statusText, text, userRole } = this.props;
    return (
      <View style={{ flex: 1, marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', paddingTop: 10, marginTop: 15, flex: 1 }}>
          <View style={{ flex: 2 }}>
            <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '500' }}>Status </Text>
          </View>
          <View style={{ flex: userRole === 'funder' ? 3: 2, marginRight: 5, justifyContent: 'flex-end' }}>
            <Tag
              textColor={WHITE}
              text={statusText}
              viewColor={projectStatusTextColor(statusText)}
            />
          </View>
          <Fragment>
            {userRole === 'funder' ? null : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => this.uploadFile()}>
                  <Image source={require('../../../assets/yellow_plus.png')} />
                </TouchableOpacity>
              </View>
            )}
          </Fragment>
        </View>
        <View style={{ flex: 4, paddingTop: 3 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '500' }}>Task Name: </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#201D41', fontSize: 15, fontWeight: '300' }}>{title} </Text>
            </View>
          </View>
          <View style={{ marginTop: '2%' }}>
            <Text style={{ color: '#222829' }}>{text}</Text>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
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
      </View>
    );
  }
}
