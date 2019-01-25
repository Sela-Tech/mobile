import React from 'react';
import { TouchableOpacity, View, Dimensions, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Entypo from 'react-native-vector-icons/Entypo';
import Text from '../Text';
import { isAndroid } from '../../utils/helpers';
import { YELLOW, WHITE } from '../../utils/constants';

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
    height: height / 6,
    borderRadius: 10,
  },
  fontS: {
    fontSize: 15,
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

const Box = ({ img, cost, firstText, secondText, thirdText, title, tags, fn }) => (
  <TouchableOpacity onPress={() => fn()} style={styles.container}>
    <View style={styles.boxHeight}>
      <Image
        resizeMode="cover"
        source={img}
        style={{ height: height / 3, width: width / 1.1, borderRadius: 10 }}
      />
      <View style={styles.viewInImage}>
        <View style={{ paddingLeft: 5 }}>
          <Image source={require('../../../assets/money.png')} />
        </View>
        <View>
          <Text style={{ color: WHITE }}> 100% funded </Text>
        </View>
      </View>
    </View>
    <View style={[styles.boxHeight, { justifyContent: 'center' }]}>
      <View style={[styles.row, { marginTop: 10 }]}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#696F74' }}>{firstText}</Text>
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
          <Text style={{ fontWeight: '300', color: YELLOW }}>{thirdText}</Text>
        </View>
      </View>
      <View style={{ marginTop: isAndroid ? '2%' : 3 }}>
        <Text style={{ fontSize: 18, fontWeight: '400', color: '#201D41' }}>{title}</Text>
      </View>
      <View style={{ marginTop: isAndroid ? '2%' : 3 }}>
        <Text style={{ fontSize: 20 }}>{cost}</Text>
      </View>
      <View
        style={{
          marginTop: isAndroid ? '2%' : 3,
          flexDirection: 'row',
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            borderRadius: 2,
          }}
        >
          <Text style={{ color: '#EB5757', fontWeight: '500' }}>{tags[0]}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <Image source={require('../../../assets/badge.png')} />
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

Box.defaultProps = {};

Box.propTypes = {
  fund: PropTypes.string,
  cost: PropTypes.string, // .isRequired,
  fn: PropTypes.func,
  title: PropTypes.string,
  third: PropTypes.number,
  firstText: PropTypes.string,
  secondText: PropTypes.string,
  // medium: PropTypes.bool,
};

export default Box;
