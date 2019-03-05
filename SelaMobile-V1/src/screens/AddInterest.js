import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import ImageBox from '../components/AddInterest/ImageBox';
import Button from '../components/Button';
import Text from '../components/Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flexGrow: 1,
    // flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default class AddInterest extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerName="Interests" />
        <ScrollView style={styles.container} contentContainerStyle={styles.subContainer}>
          <View>
            <Text>Select the SDGs that you're interested in to view relevant projects. </Text>
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_1.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_2.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_3.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_4.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_5.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_6.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_7.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_8.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_9.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_10.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_11.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_12.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_13.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_14.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_15.png')} />
          </View>

          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <ImageBox imageSrc={require('../../assets/sdgs/inactive/SDG_16.png')} />
          </View>

          <Button text="Save" textColor="#FFFFFF" />
        </ScrollView>
      </View>
    );
  }
}
