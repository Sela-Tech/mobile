import React from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { CheckBox } from 'native-base';
import Text from '../Text';
import ExtStyle from '../../utils/styles';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({

    container: {
        height: height / 10,
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        borderRadius: 5,
        borderWidth: 1,
        marginVertical: 5,
    },
    detailsTextColor: {
        color: '#3D4851',
        fontSize: 14,
    },
    textColor: {
        color: '#696F74',
    },
    threeDots: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    checkBox: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    imageViewContainer: {
        flexDirection: 'row',
        paddingRight: 10,
    },
});

const ProposalContent = () => (
    <View style={styles.container}>
        <View style={styles.checkBox}>
            <CheckBox checked={true} />
        </View>
        <View style={ExtStyle.flex4}>
            <View style={styles.contentContainer}>
                <Text style={styles.detailsTextColor}>
                    Purchase and install electrical poles
                    </Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.imageViewContainer}>
                    <View>
                        <Image source={require('../../../assets/funds.png')} />
                    </View>
                    <View>
                        <Text style={styles.textColor}> 150,000 </Text>
                    </View>
                </View>

                <View style={styles.imageViewContainer}>
                    <View>
                        <Image source={require('../../../assets/calendar.png')} />
                    </View>
                    <View>
                        <Text style={styles.textColor}> 150,000 </Text>
                    </View>
                </View>
            </View>

        </View>

        <TouchableOpacity style={styles.threeDots}>
            <Image
                source={require('../../../assets/three-dots.png')}
            />
        </TouchableOpacity>
    </View>
);
export default ProposalContent;
