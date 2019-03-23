import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Text from '../Text';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: height / 4,
    width: width / 2.2,
    borderRadius: 5,
    // justifyContent: 'center',
    marginTop: 15,
    borderStyle: 'dotted',
    borderWidth: 1,
    backgroundColor: '#0A2C56',

    // borderColor: '#F2994A',
  },
  text: {
    marginTop: 5,
    flex: 2,
    // justifyContent: 'center',
    // justifyContent: 'flex-end',
  },
});

const Box = ({ projectName, fn, text }) => (
  <TouchableOpacity style={styles.container} onPress={fn}>
    <View style={{ flex: 1, marginHorizontal: 9, justifyContent: 'center' }}>
      <View style={{ flex: 1, marginTop: 12, flexDirection: 'column' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Image source={require('../../../assets/suitcase.png')} />
        </View>
        <View style={styles.text}>
          <Text style={{ fontSize: 15, color: '#FFFFFF' }}>{projectName}</Text>
        </View>
      </View>
      <View
        style={{
          marginBottom: 10,
          flex: 1,
        }}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Text style={{ color: '#BFDBFE', fontSize: 20, fontWeight: '500' }}>Balance </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ justifyContent: 'center' }}>
            <View
              style={{
                height: 20,
                width: 30,
                backgroundColor: '#156EDC',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: 'bold' }}> PST </Text>
            </View>
          </View>
          <View style={{ marginLeft: 5 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 30, fontWeight: '400' }}>22801 </Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

Box.defaultProps = {
  empty: null,
  projectName: '',
  imageSource: '',
  fn: null,
  expandFn: null,
  text: 'Add New Site',
};

Box.propTypes = {
  projectName: PropTypes.string,
  text: PropTypes.string,
  fn: PropTypes.func,
};

export default Box;
