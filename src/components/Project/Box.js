import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import NavigationService from '../../services/NavigationService';
import Text from '../Text';
import { WHITE } from '../../utils/constants';

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        height: height / 5,
        width: width / 2.3,
        borderRadius: 5,
        justifyContent: 'center',
        borderStyle: 'dotted',
        borderWidth: 1,
    },
    imageBack: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    textView: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: WHITE,
    },
});

const Box = ({
    projectInfo,
    empty,
    siteName,
    imageSource
}) => (
        <TouchableOpacity
            style={styles.container}
            onPress={(id) => NavigationService.navigate('ExploreProject', projectInfo._id)}>
            <ImageBackground
                source={{ uri: imageSource }}
                style={styles.imageBack}
            >
                <View style={styles.textView}>
                    <Text style={styles.text}>{siteName}</Text>
                </View>
            </ImageBackground>
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
