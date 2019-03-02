import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Text from '../Text';
import ExtStyle from '../../utils/styles';
import NavigationService from '../../services/NavigationService';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: height / 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#F2F2F2',
    },
    otherContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    subContainer2: {
        flexDirection: 'column',
        paddingLeft: 5,
    },
    smallFont: {
        fontSize: 10,
    },
});

const PdfBox = () => (
    <TouchableOpacity
        onPress={() => NavigationService.navigate('PdfView')}
        style={styles.container}>
        <View style={styles.subContainer}>
            <View>
                <Image
                    source={require('../../../assets/pdf.png')}
                />
            </View>
            <View style={styles.subContainer2}>
                <View>
                    <Text>Project-scope.pdf </Text>
                </View>
                <View>
                    <Text style={styles.smallFont}>122kb </Text>
                </View>
            </View>
        </View>
        <View style={styles.otherContainer}>
            <Text> View </Text>
        </View>
    </TouchableOpacity>
)
export default PdfBox;
