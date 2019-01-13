import React from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import Text from '../Text';
import Tag from '../Tag';
import B from '../BoldText';
import Box from './Box';

const keyExtractor = item => item.id;

const renderItem = item => {
    console.log('itere', item.item);
    return (
        <View style={{ backgroundColor: 'red', height: 100, width: 100 }}>

        </View>
    )
}
{/* <Box imgSource={item.item.source} markedStatus />; */ }

const images = [
    {
        source: require('../../../assets/oilspill.png'),//../../../assets/oilspill.png
        id: 1,
    },
    {
        source: require('../../../assets/road.png'),
        id: 2,
    },
    {
        source: require('../../../assets/borehole.png'),
        id: 3,
    },
    {
        source: require('../../../assets/road.png'),
        id: 4,
    },
    {
        source: require('../../../assets/borehole.png'),
        id: 5,
    },
];

const Images = ({ statusText }) => (
    <View style={{ flex: 1, backgroundColor: 'red' }}>
        {/* <View style={{ backgroundColor: 'red' }} /> */}
        <FlatList
            style={{ flex: 1, backgroundColor: 'red' }}
            data={images}
            keyExtractor={keyExtractor}
            horizontal
            renderItem={renderItem}
        />
    </View>
);

export default Images;


