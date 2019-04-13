import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import NavigationService from '../../services/NavigationService';
import Text from '../Text';
import Tag from '../Tag';
import ExtStyles from '../../utils/styles';
import { WHITE, YELLOW } from '../../utils/constants';
import { projectStatusTextColor } from '../../utils/helpers';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height / 4,
    // width: width / 1.25,
    borderRadius: 5,
    borderStyle: 'dashed', // https://github.com/facebook/react-native/issues/17251
    borderWidth: 1,
  },
  imageBack: {
    flex: 1,
    // width: '100%',
    // height: '60%',
    borderRadius: 5,
  },
  textView: {
    flex: 2,
    paddingLeft: 5,
    paddingTop: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  address: {
    fontSize: 10,
    color: '#3D4851',
  },
  text: {
    color: '#201D41',
    fontSize: 14,
    fontWeight: '400',
  },
  amount: {
    color: YELLOW,
    fontSize: 14,
  },
  pt3: {
    // paddingTop: '1%',
    justifyContent: 'center',
  },
  pl5: {
    // flex: 1,
    borderRadius: 10,
    paddingLeft: 5,
    flexDirection: 'row',
    // paddingLeft: 5,
    // justifyContent: 'flex-start',
  },
  otherCont: {
    alignItems: 'center',
    borderColor: '#F2994A',
    // flexDirection: 'row',
    // width: width / 1.5,
  },
  mt10: {
    // marginTop: 10
  },
  imgTintColor: {
    // tintColor: '#696f74',
  },
  tagStyle: {
    width: '40%',
    // flex: 1,
    // height: '65%',
    paddingHorizontal: 5,
    paddingVertical: 3,
    // borderRadius: 10,
  },
  viewInImage: {
    paddingLeft: 5,
    backgroundColor: YELLOW,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },
  fundedTextColor: {
    color: '#201D41',
  },
  innerView: {
    flex: 1,
    height: '65%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  pl3: {
    paddingLeft: 3,
  },
});

const fundedStatus = ['60%', '40%', '20%', '85%'];

const viewToReturn = text => {
  switch (text) {
    case 'Projects you fund':
      return (
        <View style={ExtStyles.row}>
          <View style={styles.mt10}>
            <Text style={styles.text}> Explore projects to fund </Text>
          </View>
          <View style={[ExtStyles.jc, styles.pl3]}>
            <Image source={require('../../../assets/yellow_forward.png')} />
          </View>
        </View>
      );
    case 'Projects you initiated':
      return (
        <View style={ExtStyles.row}>
          <View style={ExtStyles.jc}>
            <Image source={require('../../../assets/yellow_plus.png')} />
          </View>
          <View style={styles.pl3}>
            <Text style={styles.text}> New project </Text>
          </View>
        </View>
      );
    case 'Projects that may interest you':
      return (
        <View style={ExtStyles.row}>
          <View style={ExtStyles.jc}>
            <Image source={require('../../../assets/yellow_plus.png')} />
          </View>
          <View style={styles.pl3}>
            <Text style={styles.text}> Edit interests</Text>
          </View>
        </View>
      );

    case 'Initiated by others':
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>You have not joined or been added </Text>
          <Text style={styles.text}> to any project </Text>
        </View>
      );

    case 'Bookmarks':
      return (
        <View style={styles.mt10}>
          <Text style={styles.text}>You have not bookmarked any project</Text>
        </View>
      );
    case 'Projects you evaluate':
      return (
        <View style={styles.mt10}>
          <Text style={styles.text}>You have not been added to any project</Text>
        </View>
      );

    default:
      return (
        <View style={ExtStyles.row}>
          <View style={ExtStyles.jc}>
            <Image source={require('../../../assets/yellow_plus.png')} />
          </View>
          <View style={styles.pl3}>
            <Text style={styles.text}> {text ? text : 'Propose Project'} </Text>
          </View>
        </View>
      );
  }
};

const Box = ({ projectInfo, empty, siteName, wide, imageSource, text }) => (
  <TouchableOpacity
    style={[
      styles.container,
      {
        justifyContent: empty ? 'center' : undefined,
        width: wide ? undefined : empty ? width / 1.8 : width / 1.25,
        paddingVertical: 5,
        borderStyle: 'dotted',
      },
    ]}
    onPress={
      empty
        ? () => NavigationService.navigate('CreateProject')
        : id => NavigationService.navigate('ExploreProject', projectInfo._id)
    }
  >
    {!empty ? (
      <View style={ExtStyles.flex1}>
        <ImageBackground
          source={{
            uri: projectInfo['project-avatar'] || projectInfo.avatar,
          }}
          // source={{ uri: imageSource === '' ? 'https://placeimg.com/640/480/any' : imageSource }}
          style={styles.imageBack}
        />
        <View style={[ExtStyles.flex1, { justifyContent: 'center' }]}>
          <View style={[styles.textView]}>
            <View style={styles.pt3}>
              <Text style={styles.address}>{projectInfo.location.name}</Text>
            </View>
            <View style={styles.pt3}>
              <Text style={styles.text}>{siteName}</Text>
            </View>
            <View style={styles.pt3}>
              <Text style={styles.amount}>{`$${projectInfo.goal}`}</Text>
            </View>
          </View>
          <View style={[ExtStyles.flex1, styles.pl5]}>
            <View style={styles.tagStyle}>
              <Tag
                style={{ flex: 1 }}
                text="Ongoing"
                viewColor={projectStatusTextColor('Ongoing')}
                textColor={WHITE}
              />
            </View>
            <View style={{ flex: 1 }} />
            <View style={{ flex: 1 }} />
            {/* <View style={styles.viewInImage}> */}
            {/* <View style={styles.pl5}>
                <Image
                  style={{ tintColor: '#201d41' }}
                  source={require('../../../assets/money.png')} />
              </View> */}
            {/* <View style={{
                justifyContent: 'center',
                borderRadius: 4,
                alignItems: 'center',
                flex: 1,
              }}>
                <Text style={styles.fundedTextColor}>
                  {fundedStatus[Math.floor(Math.random() * fundedStatus.length)]}
                  funded
                </Text>
              </View> */}
            {/* </View> */}
            <View style={ExtStyles.flex2} />
          </View>
        </View>
      </View>
    ) : (
      <View style={[styles.otherCont]}>{viewToReturn(text)}</View>
    )}
  </TouchableOpacity>
);

Box.defaultProps = {
  empty: null,
  siteName: '',
  imageSource: '',
};

Box.propTypes = {
  empty: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  siteName: PropTypes.string,
  imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
};

export default Box;
