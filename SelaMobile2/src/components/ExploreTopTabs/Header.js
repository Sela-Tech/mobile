import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { projectStatusTextColor, tagsColor } from '../../utils/helpers';
import extStyle from '../../utils/styles';
import Text from '../Text';
import Tag from '../Tag';
import { WHITE } from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    // marginTop: '20%',
    marginHorizontal: 12,
    justifyContent: 'space-evenly',
  },
  smallText: {
    fontSize: 14,
    color: '#696F74',
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
    fontSize: 16,
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
        <View style={[extStyle.f1row, { flex: 2, alignItems: 'center' }]}>
          <View style={{ flexDirection: 'row', flex: 5 }}>
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
          <View style={extStyle.flex1}>
            <TouchableOpacity
              onPress={() => this.changeBookmark()}>
              <Image style={extStyle.flexEnd} source={
                bookmarkStatus ? require('../../../assets/badge.png') : require('../../../assets/badge-white.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bold}>{projectTitleText.toUpperCase()}</Text>
        </View>
        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View>
              <Text style={styles.text}>Budget </Text>
            </View>
            <View style={styles.pt}>
              <Text style={styles.text}>{budgetAmount}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.text}>Raised </Text>
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
        <Fragment>
          {
            tags.length === 0 ?
              (
                <View style={{ marginTop: 2, flex: 2, flexDirection: 'row' }}>
                  <View
                    style={{ marginLeft: 3, marginTop: 2 }}>
                    <Tag
                      text="Clean Water"
                      viewColor={tagsColor('Clean Water')}
                      textColor={WHITE}
                    />
                  </View>
                </View>
              ) :
              (
                <View style={{ marginTop: 2, flex: 2, flexDirection: 'row' }}>
                  {
                    tags.slice(0, 2).map((c, index) => (
                      <View
                        key={index}
                        style={{ marginLeft: 3 }}>
                        <Tag
                          // style={{ paddingLeft: 10 }}
                          text={c}
                          viewColor={tagsColor(c)}
                          textColor={WHITE}
                        />
                      </View>
                    ))
                  }
                </View>
              )
          }
        </Fragment>
      </View>
    );
  }
}

Header.defaultProps = {};

Header.propTypes = {};

export default Header;

{/* <Tag
                          style={{}}
                          text={c}
                          viewColor="#fda0a0"
                          textColor="#eb5757"
                        /> */}


{/* <View
                        key={index}
                        style={{ marginLeft: 3 }}> */}
{/* </View> */ }