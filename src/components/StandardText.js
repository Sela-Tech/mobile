import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'red',
        fontSize: 20,
    }
});

const StandardText = ({ text, onPress, style, children }) => (
    <View style={styles.container}>
        <Text onPress={onPress} style={[styles.text, style]}>
            {text}
        </Text>
    </View>
);

StandardText.defaultProps = {
    onPress: null,
    style: {},
    children: '',
};

StandardText.propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.object]),
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};
export default StandardText;
