import React from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../Button';
import Text from '../Text';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.flatten({
  backButton: {
    marginTop: '7%',
    marginHorizontal: '5%',
    flexDirection: 'row',
  },
  backButtonText: {
    color: WHITE,
    fontSize: 15,
  },
  innerView: {
    flexDirection: 'row',
    paddingHorizontal: 3,
  },
  imagePosition: {
    position: 'absolute',
    top: 12,
    left: 10,
  },
  buttonPosition: {
    position: 'absolute',
    top: 200,
    left: 10,
  },
  pl5: {
    paddingLeft: 5,
  },
  settingsPosition: {
    position: 'absolute',
    top: 12,
    right: 5,
  },
  viewInImage: {
    backgroundColor: WHITE,
    width: width / 4,
    position: 'absolute',
    top: 150,
    left: 10,
    zIndex: 3,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  fundedTextColor: {
    color: '#201D41',
  },
  imageCoverStyle: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  bottomButton: {
    view: {
      width: width / 3.5,
      height: height / 15,
    },
    text: {
      fontSize: 14,
      fontWeight: '500',
    },
  },
  imageViewContainer: {
    height: height / 2.5,
  },
  projectNameContainer: {
    view: {
      position: 'absolute',
      top: 120,
      left: 10,
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: WHITE,
    },
  },
});

const fundedStatus = ['60%', '40%', '20%', '85%'];

const EvaluatorView = ({ navigation, projectInfo }) => (
  <View>
    <View style={styles.imageViewContainer}>
      <Image
        style={styles.imageCoverStyle}
        // resizeMode="contain"
        source={{
          uri:
            projectInfo['project-avatar'] === undefined
              ? 'https://placeimg.com/640/480/any'
              : projectInfo['project-avatar'],
        }}
      />
    </View>
    <View style={styles.imagePosition}>
      <TouchableOpacity
        transparent
        style={styles.backButton}
        onPress={() => this.props.navigation.goBack()}
      >
        <View>
          <Image source={require('../../../assets/white-back.png')} />
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.settingsPosition}>
      <TouchableOpacity transparent style={styles.backButton} onPress={() => navigation.goBack()}>
        <View>
          <Image source={require('../../../assets/settings.png')} />
        </View>
      </TouchableOpacity>
    </View>

    <View style={styles.projectNameContainer.view}>
      <Text style={styles.projectNameContainer.text}> {projectInfo.name} </Text>
    </View>

    <View style={styles.viewInImage}>
      <View style={styles.innerView}>
        <View style={styles.pl5}>
          <Image style={{ tintColor: '#201d41' }} source={require('../../../assets/money.png')} />
        </View>
        <View>
          <Text style={styles.fundedTextColor}>
            {' '}
            {fundedStatus[Math.floor(Math.random() * fundedStatus.length)]} funded{' '}
          </Text>
        </View>
      </View>
    </View>

    <View style={styles.buttonPosition}>
      <Button
        style={styles.bottomButton.view}
        textStyle={styles.bottomButton.text}
        text="Invest"
        textColor={WHITE}
      />
    </View>
  </View>
);
export default EvaluatorView;
