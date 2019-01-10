import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import CalendarBox from '../../components/Transactions/CalendarBox';
import Box from './OverviewComp/Box';
import Button from '../../components/Button';
import StandardText from '../../components/StandardText';
import { WHITE } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE,
        marginHorizontal: 10,
        marginVertical: 10,
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

export default class Overview extends Component {
    state = {
        laoding: false,
    };

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
                <CalendarBox />
                <StandardText
                    text="Project Health Overview"
                    viewStyle={{
                        marginTop: 20,
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                    }}
                    textStyle={{
                        color: "#201D41",
                        fontSize: 14,
                    }}
                />
                <Box
                    upText="Progress"
                    secondTextLeft="13%"
                    secondTextRight="+12.4%"
                />
                <Box
                    upText="Tasks Completed"
                />
            </ScrollView>
        );
    }
}
