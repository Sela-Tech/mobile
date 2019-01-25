import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Text from "../Text";
import Images from './Images';
import { YELLOW } from '../../utils/constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    semiContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        flex: 1,
    },
});

const Project = ({ leftText, rightText, projects }) => (
    <View style={styles.container}>
        <View style={styles.semiContainer}>
            <View style={{ flex: 2, paddingLeft: 5 }}>
                <Text
                    style={{ fontSize: 14, color: '#201D41' }}
                >
                    {' '}
                    {leftText}
                    {' '}

                </Text>
            </View>
            <View style={{
                justifyContent: 'center',
                flex: 1,
                flexDirection: 'row',
            }}>
                <View style={{ paddingLeft: '5%' }}>
                    <Text style={{ textAlign: 'center', color: YELLOW, fontSize: 14 }}>
                        {' '}
                        {rightText}
                        {' '}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Image source={require('../../../assets/forward-yellow.png')} />
                </View>
            </View>
        </View>


        <View style={{ paddingTop: 10, flex: 3 }}>
            <Images
                projects={projects}
            />
        </View>
    </View>
);

export default Project;
