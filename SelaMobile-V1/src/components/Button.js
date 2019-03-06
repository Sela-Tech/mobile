import React, { Fragment } from 'react';
import { TouchableOpacity, View, Dimensions, Image } from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Spinner from './Spinner';
import { YELLOW, WHITE } from '../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = {
  buttonStyle: {
    justifyContent: 'center',
    width: width / 1.3,
    borderRadius: 5,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  ml5: {
    marginLeft: 5,
  }
};

const Button = ({
  text,
  color,
  textColor,
  fn,
  textSize,
  medium,
  style,
  textStyle,
  loading,
  includeImage,
  imageSource,
}) => (
    <TouchableOpacity
      onPress={fn}
      style={[
        styles.buttonStyle,
        {
          height: medium ? height / 11 : height / 14,
          backgroundColor: color,
        },
        style,
      ]}
    >

      <Fragment>
        {
          includeImage ? (
            <Fragment>
              {
                loading ? (
                  <Spinner color={WHITE} size="small" />
                ) : (
                    <View style={styles.row}>
                      <View>
                        <Image
                          source={imageSource}
                        />
                      </View>
                      <View style={styles.ml5}>
                        <Text style={[{ color: textColor, fontSize: textSize }, textStyle]}>{text}</Text>
                      </View>
                    </View>
                  )}
            </Fragment>
          ) : (
              <Fragment>
                {
                  loading ? (
                    <Spinner color={WHITE} size="small" />
                  ) : (
                      <Text style={[{ color: textColor, fontSize: textSize }, textStyle]}>{text}</Text>
                    )}
              </Fragment>
            )
        }
      </Fragment>
    </TouchableOpacity>
  );

Button.defaultProps = {
  fn: () => { },
  color: YELLOW,
  textSize: null,
  textColor: null,
  style: null,
  loading: false,
  medium: null,
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  fn: PropTypes.func,
  loading: PropTypes.bool,
  color: PropTypes.string,
  textSize: PropTypes.number,
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  medium: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Button;
