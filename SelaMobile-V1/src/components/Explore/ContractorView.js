import React, { Fragment } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../Button';
import Text from '../Text';
import Header from '../Header';
import { WHITE } from '../../utils/constants';
import ExtStyle from '../../utils/styles';
import NavigationService from '../../services/NavigationService';

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
    top: 20,
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
    top: 20,
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

const ContractorView = ({ navigation, projectInfo, userId }) => (
  <View style={ExtStyle.flex1}>
    <Fragment>
      <View style={styles.flex4mb5}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Image
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover',
            }}
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
            onPress={() => navigation.goBack()}
          >
            <View>
              <Image source={require('../../../assets/white-back.png')} />
            </View>
            <View>
              <Text style={styles.backButtonText}> Back </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[ExtStyle.flex3]}>
        <Header
          projectLocationText={projectInfo.location.name}
          projectStatusText={projectInfo.status}
          projectTitleText={projectInfo.name}
          budgetAmount={projectInfo.goal}
          numberOfStakeholders={projectInfo.stakeholders.length}
          raisedAmount={projectInfo.raised}
          tags={projectInfo.tags}
        />
      </View>
    </Fragment>
  </View>
);
export default ContractorView;
