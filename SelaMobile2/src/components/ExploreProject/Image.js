import React from 'react';
import { ImageBackground, View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import BackButton from '../BackButton';

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: 300,
        width: 300,
    },
    upButton: {
        marginTop: 20,
        marginLeft: 15,
    },
});

const Image = ({ fn, imageSource }) => (
    <ImageBackground style={styles.container} source={imageSource}>
        <View style={styles.upButton}>
            <BackButton fn={fn} />
        </View>
    </ImageBackground>
);

Image.defaultProps = {
    fn: null,
    // imageSource: '',
};
Image.propTypes = {
    fn: PropTypes.func,
    // imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default Image;