import React, { Fragment } from 'react';
import { View, TextInput, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');
const styles = {
  container: {
    height: height / 13,
    width: width / 1.3,
    borderRadius: 5,
    borderColor: '#F5F5F8',
    borderWidth: 1,
    flexDirection: 'row',
  },
  text: {
    flex: 1,
    paddingLeft: 14,
    fontSize: 15,
  },
  viewInImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableButton: {
    position: 'absolute',
    right: 10,
  },
  sideImageStyle: {
    position: 'absolute',
    right: 10,
    top: 25,
  },
};

const Input = ({
  text,
  secure,
  onTheChange,
  showPassword,
  medium,
  showPass,
  style,
  textStyle,
  placeHolderColor,
  multiline,
  sideImageStatus,
  sideImage,
  numb,
  onChangeTheText,
  value,
  error,
  errorMessage,
}) => (
    <View style={{ flexDirection: 'column' }}>
      <View style={[styles.container, { height: height / 11 }, style]}>
        <TextInput
          value={value}
          placeholder={text}
          // placeholderTextColor="#000"
          placeholderTextColor={placeHolderColor || '#F5F5F8'}
          onChangeText={onChangeTheText}
          onChange={onTheChange}
          secureTextEntry={secure}
          autoCapitalize="none"
          multiline={multiline}
          underlineColorAndroid="rgba(0,0,0,0)"
          spellCheck={false}
          autoCorrect={false}
          blurOnSubmit={false}
          numberOfLines={multiline ? 5 : 1}
          keyboardType={numb ? 'numeric' : 'default'}
          style={[textStyle, styles.text]}
        />
        <Fragment>
          {showPass ? (
            <View style={styles.viewInImage}>
              <TouchableOpacity style={styles.touchableButton} onPress={showPassword}>
                <Image source={require('../../assets/img/eye.png')} />
              </TouchableOpacity>
            </View>
          ) : null}
        </Fragment>
        <Fragment>
          {sideImageStatus ? (
            <View style={styles.sideImageStyle}>
              <Image source={sideImage} />
            </View>
          ) : null}
        </Fragment>
      </View>
      <Fragment>
        {error ? (
          <View style={{ justifyContent: 'center' }}>
            <Text style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</Text>
          </View>
        ) : null}
      </Fragment>
    </View>
  );

Input.defaultProps = {
  secure: null,
  showPass: null,
  showPassword: null,
  medium: null,
  onTheChange: null,
  // style: {},
  multiline: false,
  // textStyle: '',
  placeHolderColor: '',
};

Input.propTypes = {
  text: PropTypes.string.isRequired,
  placeHolderColor: PropTypes.string,
  secure: PropTypes.bool,
  showPass: PropTypes.bool,
  medium: PropTypes.bool,
  multiline: PropTypes.bool,
  // style: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  // textStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  showPassword: PropTypes.func,
  onTheChange: PropTypes.func,
};

export default Input;
