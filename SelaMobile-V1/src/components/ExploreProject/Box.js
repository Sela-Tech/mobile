import React, { Fragment } from 'react';
import { TouchableOpacity, View, Dimensions, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import Text from '../Text';
import Tag from '../Tag';
import { isAndroid, projectStatusTextColor, tagsColor } from '../../utils/helpers';
import { YELLOW, WHITE } from '../../utils/constants';
// import { projectStatusTextColor, tagsColor } from '../../utils/helpers';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  mainContainer: {
    height: 10,
  },
  row: {
    flexDirection: 'row',
  },
  boxHeight: {
    // height: height / 4,
    flex: 3,
    borderRadius: 10,
  },
  smaller: {
    flex: 3,
    borderRadius: 10,
  },
  fontS: {
    fontSize: 10,
    // fontSize: width < 400 ? 11 : 15,
  },
  viewInImage: {
    backgroundColor: '#C13C1E',
    width: width / 3.5,
    position: 'absolute',
    top: 20,
    left: 30,
    zIndex: 3,
    flexDirection: 'row',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

const fundedStatus = ['60%', '40%', '20%', '85%'];

const Box = ({ img, cost, firstText, secondText, thirdText, title, tags, fn }) => (
  <TouchableOpacity onPress={() => fn()} style={styles.container}>
    <View style={styles.boxHeight}>
      <Image
        // resizeMode="cover"
        source={img}
        style={{ height: height / 3, width: width / 1.1, borderRadius: 10 }}
      />
      <View style={styles.viewInImage}>
        <View style={{ paddingLeft: 5 }}>
          <Image source={require('../../../assets/money.png')} />
        </View>
        <View>
          <Text style={{ color: WHITE }}>
            {' '}
            {fundedStatus[Math.floor(Math.random() * fundedStatus.length)]}
            {' '}
            funded
              {' '}
          </Text>
        </View>
      </View>
    </View>
    <View style={[styles.smaller, { marginLeft: 3, justifyContent: 'center' }]}>
      <View style={[styles.row, { marginTop: 5 }]}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 10, fontWeight: '400', color: '#696F74' }}>
            {firstText.slice(0, 18).concat(' ...')}
          </Text>
          <Entypo name="dot-single" size={18} color="#696F74" />
        </View>
        <View style={{ paddingLeft: isAndroid ? '1%' : 2, flexDirection: 'row' }}>
          <View>
            <Text style={[styles.fontS, { fontWeight: '400', color: '#696F74' }]}>
              {secondText}
            </Text>
          </View>
          <View>
            <Entypo name="dot-single" size={18} color="#696F74" />
          </View>
        </View>
        <View style={{ paddingLeft: isAndroid ? '1%' : 2 }}>
          <Text
            style={[styles.fonts, { fontWeight: '300', color: projectStatusTextColor(thirdText) }]}
          >
            {thirdText}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, fontWeight: '400', color: '#201D41' }}>{title}</Text>
      </View>
      <View style={{ paddingVertical: 5, flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, fontWeight: '600' }}>
          {' '}
          {cost === '' ? '$200000' : `$${cost}`}
          {' '}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          // marginTop: isAndroid ? '2%' : 3,
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <Fragment>
          {tags.length === 0 ? (
            <View style={{ marginLeft: 3 }}>
              <Tag text="Clean Water" viewColor={tagsColor('Clean Water')} textColor={WHITE} />
            </View>
          ) : (
              <View style={{ flexDirection: 'row', flex: 2 }}>
                {tags.slice(0, 2).map((c, index) => (
                  <View
                    key={index} style={{ marginLeft: 3 }}>
                    <Tag text={c} viewColor={tagsColor(c)} textColor={WHITE} />
                  </View>
                ))}
              </View>
            )}
        </Fragment>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Image
            source={
              require('../../../assets/badge.png') || require('../../../assets/badge-white.png')
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

Box.defaultProps = {};

Box.propTypes = {
  fund: PropTypes.string,
  cost: PropTypes.number, // .isRequired,
  fn: PropTypes.func,
  title: PropTypes.string,
  third: PropTypes.number,
  firstText: PropTypes.string,
  secondText: PropTypes.string,
  // medium: PropTypes.bool,
};

export default Box;
