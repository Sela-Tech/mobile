import React from 'react';
import { View, Dimensions, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import { WHITE } from '../../utils/constants';
import Text from '../Text';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        // backgroundColor: 'red',
        height: height / 3,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
});


const dModal = ({
    visibility,
    imageSource,
    content,
    show,
}) => (
        <Modal
            isVisible={visibility}
        >
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignContent: 'flex-end',
                        justifyContent: 'flex-end'
                    }}
                    onPress={() => show()}>
                    <Image
                        resizeMode="contain"
                        style={{
                            height: 50,
                            width: 35,
                        }}
                        source={require('../../../assets/close_icon.png')}
                    />
                </TouchableOpacity>
                <View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#201D41', fontSize: 15 }}>
                            Details
                        </Text>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text>
                            {content}
                        </Text>
                    </View>
                </View>
            </View>
        </Modal>
    );

export default dModal;
