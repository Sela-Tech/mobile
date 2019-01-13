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
        height: height / 5,
        width: width / 2.3,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: 15,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: '#F2994A',
    },
    imageBack: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    text: {
        position: 'absolute',
        bottom: 30,
        left: 30,
    },
});

const Box = ({ empty, siteName, imageSource, fn, text, expandFn }) => (
    <TouchableOpacity style={styles.container} onPress={fn}>
        <View style={{ height: 100, width: 100 }}>
            <ImageBackground style={styles.imageBack} source={imageSource}>
                <View style={styles.text}>
                    <Text style={{ fontSize: 20 }}>{siteName}</Text>
                </View>
            </ImageBackground>
        </View>
    </TouchableOpacity>
);

Box.defaultProps = {
    empty: null,
    siteName: '',
    imageSource: '',
    fn: null,
    expandFn: null,
    text: 'Add New Site',
};

Box.propTypes = {
    empty: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    siteName: PropTypes.string,
    text: PropTypes.string,
    imageSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    fn: PropTypes.func,
    expandFn: PropTypes.func,
};

export default Box;