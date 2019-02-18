import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { projectStatusTextColor, tagsColor } from '../../utils/helpers';
import extStyle from '../../utils/styles';
import Text from '../Text';
import Tag from './ClTag';
import { WHITE } from '../../utils/constants';


const { width } = Dimensions.get('window');
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
  verySmallText: {
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
    bookmarkStatus: false,
  };

  changeBookmark = () =>
    this.setState(prevState => ({ bookmarkStatus: !prevState.bookmarkStatus }));

  render() {
    const {
      projectStatusText,
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
                <Text style={styles.verySmallText}>
                  {projectLocationText.length > 35
                    ? projectLocationText.slice(0, 32).concat('...')
                    : projectLocationText}
                  {' '}
                </Text>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Entypo name="dot-single" size={12} color="#696F74" />
              </View>
            </View>
            <View>
              <Text
                style={[styles.verySmallText, {
                  color: projectStatusTextColor('ON GOING')
                }]}
              >
                {'ON GOING'}
              </Text>
            </View>
          </View>
          <View style={extStyle.flex1}>
            <TouchableOpacity onPress={() => this.changeBookmark()}>
              <Image
                style={extStyle.flexEnd}
                source={
                  bookmarkStatus
                    ? require('../../../assets/badge.png')
                    : require('../../../assets/badge-white.png')
                }
              />
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
              <Text style={styles.text}>
                {projectTitleText.toUpperCase()
                  === 'ABA FACTORY CONSTRUCTION' ?
                  '$750,000' : '$2,000,000'
                }
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.text}>Raised </Text>
            </View>
            <View style={styles.pt}>
              <Text style={styles.text}>
                {projectTitleText.toUpperCase()
                  === 'ABA FACTORY CONSTRUCTION' ?
                  '$350,000' : '$350,000'
                }
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text>StakeHolders</Text>
            </View>
            <View style={styles.pt}>
              <Text style={styles.text}>4</Text>
            </View>
          </View>
        </View>
        <Fragment>
          {tags.length === 0 ? (
            <View style={{ marginTop: 2, flex: 2, flexDirection: 'row' }}>
              <View style={{ marginLeft: 3, marginTop: 2 }}>
                <Tag text="Clean Water" viewColor={tagsColor('Clean Water')} textColor={WHITE} />
              </View>
            </View>
          ) : (
              <View style={{
                marginTop: 2, flex: 2,
                flexDirection: 'row'
              }}>

                {
                  projectTitleText.toUpperCase()
                    === 'ABA FACTORY CONSTRUCTION' ?
                    (
                      <View style={{ flexDirection: 'row' }} >

                        <Tag
                          src={require('../../../assets/sdgs/SDG_1.png')}
                        />
                        <Tag
                          src={require('../../../assets/sdgs/SDG_8.png')}
                        />

                      </View>
                    ) :
                    (
                      <View style={{ flexDirection: 'row' }} >
                        <Tag
                          src={require('../../../assets/sdgs/SDG_3.png')}
                        />

                        <Tag
                          src={require('../../../assets/sdgs/SDG_13.png')}
                        />

                        <Tag
                          src={require('../../../assets/sdgs/SDG_14.jpg')}
                        />


                        <Tag
                          src={require('../../../assets/sdgs/SDG_6.png')}
                        />

                      </View>
                    )
                }
                <View />
              </View>
            )}
        </Fragment>
      </View>
    );
  }
}

Header.defaultProps = {};

Header.propTypes = {};

export default Header;
