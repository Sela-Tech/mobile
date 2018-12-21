import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity } from 'react-native';
import Text from '../../components/Text';
import B from '../../components/BoldText';
import UserProfile from '../../components/UserProfile';
import Button from '../../components/Button';
import { WHITE, YELLOW } from '../../utils/constants';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 15,
        backgroundColor: WHITE,

    },
    subContainer: {
        flex: 1,
        marginTop: height / 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: width / 2,
    },
});

export default () => (
    <ScrollView style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
    >
        <View style={{ marginTop: '4%', flex: 1 }}>
            <Text style={{ color: '#222829' }}>
                This project involves the construction of three classroom blocks at the Surulere Grammar School, Lagos. These classroom blocks will house five classrooms, one staff room and two offices each. It is expected to be completed by the 31st January, 2018. The aim is to provide a conducive learning environment for the students of this academic institution and contribute to lowering the illiteracy rate in Nigeria.
           </Text>
        </View>
        <View style={{ paddingTop: 10 }}>
            <B
                color={YELLOW}>
                INITIATED BY
               </B>
        </View>
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <UserProfile
                    imgSource={require('../../../assets/person.png')}
                    userName="Hawa Mohammed"
                    companyName="Markers LTD"
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }}>
                    <View>
                        <Text style={{ color: '#201D41', fontSize: 15, }}> See all StakeHolder </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/forward-arrow.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', flex: 1, marginTop: 20, }}>
                <Button
                    text="Submit Updates"
                />
            </View>
        </View>
    </ScrollView>
);
