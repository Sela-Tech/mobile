import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import B from './BoldText';
import Text from './Text';
import { DEFAULT_COLOUR, WHITE, YELLOW } from '../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DEFAULT_COLOUR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: WHITE,
    fontSize: 15,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    // marginTop: '10%',
  },
});

export default class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, info: null };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, info, error });
    console.log('error', error);
    console.log('info', info);
    // You can also log the error to an error reporting service
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <View style={styles.container}>
          <Image source={require('../../assets/goldlogo.png')} />
          <View style={styles.innerContainer}>
            <Text style={styles.textStyle}> "Each of us can make a </Text>
            <Text style={styles.textStyle}> difference; together we make change" </Text>
            <B color={YELLOW}> Barbara Milkuski </B>
          </View>
        </View>
      );
    }
    return children;
  }
}

ErrorHandler.propTypes = {
  children: PropTypes.element.isRequired,
};
