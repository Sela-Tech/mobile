import React from 'react';
import { View, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import { WHITE } from '../../utils/constants';
import { tagText } from '../../utils/helpers';
import Text from '../Text';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: WHITE,
        // backgroundColor: 'red',
        height: height / 2,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    img: {
        height: width / 4,
        width: width / 3.5,
    },
});

const TagDisplay = ({
    visibility,
    imageSource,
    text,
    showTag
}) => (
        <Modal
            isVisible={visibility}
        >
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignContent: 'flex-end',
                            justifyContent: 'flex-end'
                        }}
                        onPress={() => showTag(imageSource)}>
                        <Image
                            resizeMode="contain"
                            style={{
                                height: 50,
                                width: 35,
                            }}
                            source={require('../../../assets/close_icon.png')}
                        />
                    </TouchableOpacity>
                    <View style={{}}>
                        <View>
                            <Image
                                style={styles.img}
                                source={imageSource}
                            />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text
                                    style={{
                                        color: '#201D41',
                                        fontSize: 16,
                                        fontWeight: '400',
                                    }}
                                >
                                    {tagText(imageSource).title}
                                </Text>
                            </View>

                            <View style={{
                                marginTop: 10,
                                marginBottom: 10,
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#3D4851',
                                }}>
                                    {tagText(imageSource).text}
                                </Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </Modal>
    );

export default TagDisplay;
