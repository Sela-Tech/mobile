import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Text from '../../../components/Text';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: height / 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F5F5F8',
        width: width / 1.5,
        marginVertical: 12,
    },
    text: {
        color: '#222829',
        fontSize: 20
    },
    viewStyle: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'center',
        // alignItems: 'center',
    },
})

const Box = ({
    upText,
    secondTextLeft,
    secondTextRight,
}) => (
        <View style={styles.container}>
            <View style={styles.viewStyle}>
                <Text style={styles.text}> {upText} </Text>
            </View>
            <View style={{
                justifyContent: 'center',
                paddingHorizontal: 20,
                flexDirection: 'row',
                flex: 1
            }}>
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={[styles.text, {
                        fontSize: 30,
                        fontWeight: "500"
                    }]}>
                        {secondTextLeft} </Text>
                </View>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end'
                }}>
                    <Text style={[styles.text, {
                        color: '#369C05',
                        fontSize: 14,
                    }]}>
                        {secondTextLeft}
                    </Text>
                </View>
            </View>
            <View style={styles.viewStyle}>

            </View>
        </View >
    )

Box.defaultProps = {

};

Box.propTypes = {

};

export default Box;