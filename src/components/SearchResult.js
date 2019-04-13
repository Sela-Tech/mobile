import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { List, ListItem, Left, Body } from 'native-base';

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  searchResultsWrapper: {
    // flex: 1,
    borderRadius: 8,
    height: height / 2,
    backgroundColor: '#F7F7FA',
    opacity: 0.9,
  },
  primaryText: {
    fontWeight: 'bold',
    color: '#373737',
  },
  secondaryText: {
    fontStyle: 'italic',
    color: '#7D7D7D',
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: '#7D7D7D',
  },
  leftIcon: {
    color: '#7D7D7D',
  },
  distance: {
    fontSize: 12,
  },
});

export default ({ places, handleSelectedAddress, searchResultList }) => {
  if (searchResultList === false) {
    return null;
  }

  return (
    <View style={styles.searchResultsWrapper}>
      <List
        keyboardShouldPersistTaps="always"
        dataArray={places}
        renderRow={item => (
          <View>
            <ListItem
              button
              avatar
              onPress={(name, id) => handleSelectedAddress(item.primaryText, item.placeID)}
            >
              <Left style={styles.leftContainer}>
                <Image source={require('../../assets/location.png')} />
              </Left>
              <Body>
                <Text style={styles.primaryText}>{item.primaryText}</Text>
                <Text style={styles.secondaryText}>{item.secondaryText}</Text>
              </Body>
            </ListItem>
          </View>
        )}
      />
    </View>
  );
};
