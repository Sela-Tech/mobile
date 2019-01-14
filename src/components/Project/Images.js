import React from 'react';
import { View, FlatList } from 'react-native';
import { Avatar } from 'react-native-gifted-chat';
import Box from './Box';

const keyExtractor = (item, index) => index.toString();

const renderItem = item => (
  <View style={{ paddingLeft: 5 }}>
    <Box
      projectInfo={item.item}
      siteName={item.item.name}
      imageSource={item.item['project-avatar']} />
  </View>
);

const Images = ({ projects }) => (
  <FlatList
    style={{ flex: 1 }}
    data={projects}
    keyExtractor={keyExtractor}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={renderItem}
  />
);

export default Images;
