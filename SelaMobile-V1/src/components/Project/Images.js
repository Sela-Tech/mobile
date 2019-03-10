import React from 'react';
import { View, FlatList } from 'react-native';
import Box from './Box';

const keyExtractor = (item, index) => index.toString();

const renderItem = item => (
  <View style={{ paddingLeft: 5 }}>
    {item.item.val === 'empty' ? (
      <Box text="Propose Project" fn={() => console.log('navigate')} />
    ) : (
      <Box
        projectInfo={item.item}
        siteName={item.item.name}
        imageSource={item.item['project-avatar']}
      />
    )}
  </View>
);

const Images = ({ projects, leftText, column }) => {
  const proj =
    leftText === 'Projects you proposed' || leftText === 'Initiated by you'
      ? [...projects]
      : projects;
  return (
    <FlatList
      style={{ flex: 1 }}
      data={proj}
      keyExtractor={keyExtractor}
      horizontal={!column}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default Images;
