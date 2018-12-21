import React, { Component } from 'react';
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


export default class Notifications extends Component {
    static navigationOptions = {
        title: 'Notifications',
    };
    state = {
        empty: true,
    }
    render() {
        const { empty } = this.state;
        if (empty) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Image source={require('../../assets/docs.png')} />
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }}>
                        <Text style={{ color: '#201D41' }}> You have not received any  </Text>
                        <Text style={{ color: '#201D41' }} > notifications yet.</Text>
                    </View>
                </View >

            )
        }
        return (
            <View />
        )
    }
};