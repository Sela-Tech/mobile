import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Text from '../../components/Text';
import Images from './Images';
import { YELLOW } from '../../utils/constants';

const Project = ({ leftText, rightText }) => (
    <View>
        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
            <View style={{ flex: 1, paddingLeft: 5 }}>
                <Text style={{ fontSize: 14, color: '#201D41' }}> {leftText} </Text>
            </View>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '20%',
                flex: 1,
                flexDirection: 'row'
            }}>
                <View style={{}}>
                    <Text style={{ color: YELLOW, fontSize: 14 }}> {rightText} </Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Image source={require('../../../assets/forward-yellow.png')} />
                </View>
            </View>
        </View>

        <View style={{ paddingTop: 10, flex: 2 }}>
            <Images />
        </View>
    </View>
)
export default Project;