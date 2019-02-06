import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { projectStatusTextColor } from '../../utils/helpers';
import extStyle from '../../utils/styles';
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
    fontSize: 15,
  },
  pt: {
    paddingTop: 3,
  },
  text: {
    color: '#201D41',
    fontSize: 15,
  },
  bold: {
    color: '#201D41',
    fontSize: 15,
    fontWeight: '400',
  },
});

class Header extends Component {
  state = {
    bookmarkStatus: false
  };
  changeBookmark = () => this.setState(prevState => ({ bookmarkStatus: !prevState.bookmarkStatus }))

  render() {
    const {
      projectStatusText,
      projectNameText,
      projectLocationText,
      projectTitleText,
      budgetAmount,
      numberOfStakeholders,
      raisedAmount,
      tags,
    } = this.props;
    const { bookmarkStatus } = this.state;
    return (
      <View style={styles.container}>
        <View style={extStyle.f1row}>
          <View style={{ flexDirection: 'row', flex: 5, marginTop: 3 }}>
            <View style={extStyle.row}>
              <View>
                <Text style={styles.smallText}>
                  {projectLocationText
                    .toUpperCase()
                    .slice(0, 10)
                    .concat('...')}
                  {' '}
                </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Entypo name="dot-single" size={20} color="#696F74" />
              </View>
            </View>
            <View style={extStyle.row}>
              <View>
                <Text style={styles.smallText}>{projectNameText.slice(0, 8).concat('...')}</Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Entypo name="dot-single" size={18} color="#696F74" />
              </View>
            </View>
            <View>
              <Text style={[styles.smallText, { color: projectStatusTextColor(projectStatusText) }]}>
                {projectStatusText}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.changeBookmark()}
            style={extStyle.flex1}>
            <Image style={extStyle.flexEnd} source={
              bookmarkStatus ? require('../../../assets/badge.png') : require('../../../assets/badge-white.png')} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 5 }}>
          <Text style={styles.bold}>{projectTitleText.toUpperCase()}</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', marginTop: 9 }}>
          <View>
            <View>
              <Text>Budget </Text>
            </View>
            <View style={styles.pt}>
              <Text style={styles.text}>{budgetAmount}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>Raised </Text>
            </View>
            <View style={styles.pt}>
              <Text style={styles.text}>{raisedAmount}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text>StakeHolders</Text>
            </View>
            <View style={styles.pt}>
              <Text style={styles.text}>{numberOfStakeholders} </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 2, paddingTop: 10 }}>
          <Tag text={tags[0]} viewColor="#fda0a0" textColor="#eb5757" />
          {/* <View style={{ flex: 1 }} /> */}
        </View>
      </View>
    );
  }
}

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
