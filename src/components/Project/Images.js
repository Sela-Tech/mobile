import React from 'react';
import { View, FlatList } from 'react-native';
import Box from './Box';

const keyExtractor = (item, index) => index.toString();

const renderItem = item => (
    <View style={{ paddingLeft: 5 }}>
        <Box
            imageSource={item.item.source}
            siteName={item.item.name} />
    </View>
);

const images = [
    {
        source: require('../../../assets/borehole.png'),
        id: 1,
        name: 'Idejo Classroom Blocks Construction',
    },
    {
        source: require('../../../assets/road.png'),
        id: 2,
        name: 'Idejo Classroom Blocks Construction',
    },
    {
        source: require('../../../assets/borehole.png'),
        id: 3,
        name: 'Idejo Classroom Blocks Construction',
    },
    {
        source: require('../../../assets/road.png'),
        id: 4,
        name: 'Idejo Classroom Blocks Construction',
    },
    {
        source: require('../../../assets/borehole.png'),
        id: 5,
        name: 'Idejo Classroom Blocks Construction',
    },
];

const Images = () => (
    <FlatList
        style={{ flex: 1 }}
        data={images}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
    />

);

export default Images;


