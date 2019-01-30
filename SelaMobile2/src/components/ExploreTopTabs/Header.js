import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Text from '../Text';
import Tag from '../Tag';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 12,
    justifyContent: 'space-between',
  },
  smallText: {
    fontSize: 10,
  },
  pt: {
    paddingTop: 3,
  },
  text: {
    color: '#201D41',
    fontSize: 15,
  },
});

const Header = ({
  projectStatusText,
  projectNameText,
  projectLocationText,
  projectTitleText,
  budgetAmount,
  numberOfStakeholders,
  raisedAmount,
  tags,
}) => (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flexDirection: 'row', flex: 5 }}>
          <View>
            <Text style={styles.smallText}> {projectLocationText} </Text>
          </View>
          <View style={{ marginTop: -5 }}>
            <Entypo name="dot-single" size={18} color="#696F74" />
          </View>
          <View>
            <Text style={styles.smallText}> {projectNameText}</Text>
          </View>
          <View style={{ marginTop: -5 }}>
            <Entypo name="dot-single" size={18} color="#696F74" />
          </View>
          <View>
            <Text style={[styles.smallText, { color: '#369C05' }]}>{projectStatusText}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Image style={{ alignSelf: 'flex-end' }} source={require('../../../assets/badge.png')} />
        </View>
      </View>
      <View style={{ flex: 1, marginTop: 5 }}>
        <Text style={styles.text}> {projectTitleText}</Text>
      </View>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
        <View>
          <View>
            <Text> Budget </Text>
          </View>
          <View style={styles.pt}>
            <Text style={styles.text}> {budgetAmount}</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>Raised </Text>
          </View>
          <View style={styles.pt}>
            <Text style={styles.text}> {raisedAmount}</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>StakeHolders</Text>
          </View>
          <View style={styles.pt}>
            <Text style={styles.text}> {numberOfStakeholders} </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', flex: 2, paddingTop: 10 }}>
        <Tag
          text={tags[0]}
          viewColor="#fda0a0"
          textColor="#eb5757"
        />
        {/* <View style={{ flex: 1 }} /> */}
      </View>
    </View>
  );

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
