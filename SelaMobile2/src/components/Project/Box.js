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
import { getDummyDisplayPicture, projectStatusTextColor } from '../../utils/helpers';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height / 4,
    width: width / 1.25,
    borderRadius: 5,
    borderStyle: 'dotted',
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
    // width: width / 1.5,
  },
  mt10: {
    marginTop: 10
  },
  imgTintColor: {
    tintColor: '#696f74',
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



    // borderRadius: 10,
    paddingLeft: 5,
    // flexDirection: 'row',

    // paddingHorizontal: 5,
    // height: '65%',
    // paddingVertical: 5,
    backgroundColor: YELLOW,
    // flex: 1,
    // borderRadius: 10,
    borderRadius: 10,
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '40%',
    // paddingHorizontal: 5,
    // paddingVertical: 3,
    // borderRadius: 10,
    flexDirection: 'row',
    // paddingLeft: 5,
    // justifyContent: 'flex-start',

    // position: 'absolute',
    // top: 20,
    // right: 30,
    // zIndex: 3,
    // borderRadius: 10,
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
});

const fundedStatus = ['60%', '40%', '20%', '85%'];

const Box = ({ projectInfo, empty, siteName, imageSource, text }) => (
  <TouchableOpacity
    style={[styles.container, {
      justifyContent: !!empty ? 'center' : undefined, width: !!empty ? width / 1.8 : width / 1.25
    }]}
    onPress={
      empty
        ? () => NavigationService.navigate('CreateProject')
        : id => NavigationService.navigate('ExploreProject', projectInfo._id)
    }
  >
    {!empty ? (
      <View style={ExtStyles.flex1}>
        <ImageBackground
          source={getDummyDisplayPicture(siteName)}
          // source={{ uri: imageSource === '' ? 'https://placeimg.com/640/480/any' : imageSource }}
          style={styles.imageBack}
        >

        </ImageBackground>
        <View style={[ExtStyles.flex1
          , { justifyContent: 'center' }]}>
          <View style={[styles.textView]}>
            <View style={styles.pt3}>
              <Text style={styles.address}>{projectInfo.location.name}</Text>
            </View>
            <View style={styles.pt3}>
              <Text style={styles.text}>{siteName}</Text>
            </View>
            <View style={styles.pt3}>
              {/* <Text style={styles.amount}>{`$${projectInfo.goal}`}</Text> */}
              <Text style={styles.amount}>{siteName.toUpperCase()
                === 'ABA FACTORY CONSTRUCTION' ?
                '$750,000' : '$2,000,000'
              }
              </Text>
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
        <View style={[styles.empty, styles.otherCont]}>
          <View style={ExtStyles.jc}>
            <Image source={require('../../../assets/plus.png')} style={styles.imgTintColor} />
          </View>
          <View style={styles.mt10}>
            <Text> {text ? text : 'Propose Project'} </Text>
          </View>
        </View>
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
