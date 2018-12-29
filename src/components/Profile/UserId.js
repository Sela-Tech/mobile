import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';
import Tag from '../Tag';
import { YELLOW, WHITE } from '../../utils/constants';


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

const UserId = ({ settings }) => (
    <View style={styles.container}>
        <View style={styles.imgStyle}>
            <Image source={require('../../../assets/img/man.png')} style={styles.imgStyle} />
        </View>
        <View style={{ alignItems: 'center', paddingTop: 5 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: YELLOW, fontWeight: '400' }}> Ade Bassey </Text>
                <Text> Contractor </Text>
            </View>
            {
                settings ? (
                    <View style={{ paddingTop: 5 }}>
                        <Tag
                            text="Not Verified"
                            viewColor="#BC1717"
                            textColor={WHITE}
                        />
                    </View>
                ) : null
            }
        </View>
    </View>
);

export default UserId;
