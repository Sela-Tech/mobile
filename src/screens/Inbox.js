import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Text from '../components/Text';
import Button from '../components/Button';
import { WHITE, YELLOW } from '../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
    },
    subContainer: {
        flex: 5,
        marginTop: height / 4,
        alignItems: 'center',
    },
    button: {
        width: width / 2,
    },
});

export default () => (
    <View style={styles.container}>
        <View style={{ marginTop: '4%', marginLeft: '4%', flex: 1 }}>
            <Button
                text="New Message"
                color={YELLOW}
                textColor={WHITE}
                style={styles.button}
            />
        </View>
        <View style={styles.subContainer}>
            <View>
                <Image source={require('../../assets/docs.png')} />
            </View>
            <View style={{ alignItems: 'center', margin: 10 }}>
                <Text> You have not received any </Text>
                <Text> messages yet </Text>
            </View>
        </View>
    </View>
);
