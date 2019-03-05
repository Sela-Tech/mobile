import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Map from './Map';
import { projectStatusTextColor, tagsColor } from '../../utils/helpers';
import extStyle from '../../utils/styles';
import Text from '../Text';
import Tag from './ClTag';
import PdfBox from './PdfBox';
import TagDisplay from './TagDisplay';
import { WHITE, YELLOW } from '../../utils/constants';


const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  smallText: {
    fontSize: 14,
    color: '#696F74',
  },
  verySmallText: {
    fontSize: 14,
    color: '#201D41',
  },
  pt: {
    paddingTop: 3,
  },
  text: {
    color: '#696F74',
    fontSize: 15,
  },
  bold: {
    color: '#201D41',
    fontSize: 16,
    fontWeight: '500',
  },
  parentTagStyle: {
    paddingTop: 5,
    // backgroundColor: 'red',
    // flex: 1,
    // height: 80,
    borderRadius: 10,
    paddingHorizontal: 5,
    // flexDirection: 'row',
    // paddingLeft: 5,
    // justifyContent: 'flex-start',
  },
  tagStyle: {
    // width: 80,
    // height: 80,
    // width: '100%',
    // height: '100%',
    // paddingHorizontal: 5,
    // borderRadius: 10,

    // flex: 1,
    height: '60%',
    // width: '150%',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 10,
  },
});

export default class OverView extends Component {
  state = {
    bookmarkStatus: false,
    openMap: false,
  };

  showTag = src => {
    this.setState(prevState => ({
      showTag: !prevState.showTag,
      src,
    }));
  };

  changeBookmark = () =>
    this.setState(prevState => ({ bookmarkStatus: !prevState.bookmarkStatus }));

  toggleMapView = () => this.setState(prevState => ({ openMap: !prevState.openMap }));

  render() {
    const {
      projectStatusText,
      projectLocationText,
      projectTitleText,
      budgetAmount,
      numberOfStakeholders,
      raisedAmount,
      tags,
      locationDetails,
    } = this.props;
    const { bookmarkStatus, showTag, src, openMap } = this.state;
    if (openMap) {
      return (
        <View style={styles.container}>
          <Map
            visible={openMap}
            toggleMapView={this.toggleMapView}
            location={locationDetails}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={[{ flex: 2 }]}>
          <View style={{ flexDirection: 'row', flex: 3 }}>
            <View style={[{ paddingTop: 5, flex: 1 }]}>
              <View>
                <Text
                  style={{ fontSize: 12, color: '#696F74' }}
                >
                  LOCATION
                                </Text>
              </View>
              <View style={[extStyle.row, {}]}>
                <View>
                  <Text style={styles.verySmallText}>
                    {projectLocationText.length > 35
                      ? projectLocationText.slice(0, 32).concat('...')
                      : projectLocationText}{' '}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => this.toggleMapView()}
                    style={{ paddingLeft: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <View>
                      <Text style={{ color: YELLOW }}> View on map</Text>
                    </View>

                    <View style={{ paddingLeft: 5 }}>
                      <Image
                        source={require('../../../assets/forward_yellow.png')}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.parentTagStyle}>
              <Tag
                style={styles.tagStyle}
                text="Ongoing"
                viewColor={projectStatusTextColor('Ongoing')}
                textColor={WHITE}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text>
              Energy is at the heart of development, Without energy, communities live in darkness,
              essential services such as clinics and schools suffer, and businesses operate under
              crippling constraints. Because the process is taking longer than expected and will not
              be completed by the original closing date a one year extension is being requested.
                        </Text>
          </View>

          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <View style={{ paddingTop: 5 }}>
                <Text style={{ color: '#696F74' }}>Duration </Text>
              </View>
              <View style={styles.pt}>
                <Text style={{ color: '#3D4851', fontSize: 16 }}>12 Jan 19 - 02 Dec 20</Text>
              </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View>
                <View>
                  <Text style={styles.text}>Budget </Text>
                </View>
                <View style={styles.pt}>
                  <Text style={styles.text}>
                    {projectTitleText.toUpperCase()
                      === 'ABA FACTORY CONSTRUCTION' ?
                      '$750,000'
                      : '$2,000,000'}
                  </Text>
                </View>
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
                  marginTop: 2,
                  flex: 2,
                  flexDirection: 'row',
                }}
                >
                  {projectTitleText.toUpperCase() === 'ABA FACTORY CONSTRUCTION' ? (
                    <View style={{ flexDirection: 'row' }}>
                      <Tag
                        showTag={this.showTag}
                        // showTag={this.showTag(require('../../../assets/sdgs/SDG_1.png'))}
                        src={require('../../../assets/sdgs/SDG_1.png')}
                      // src={src}
                      />
                      <Tag
                        showTag={this.showTag}
                        // showTag={this.showTag(require('../../../assets/sdgs/SDG_8.png'))}
                        src={require('../../../assets/sdgs/SDG_8.png')}
                      // src={src}
                      />
                    </View>
                  ) : (
                      <View style={{ flexDirection: 'row' }}>
                        <Tag
                          showTag={this.showTag}
                          // showTag={this.showTag(require('../../../assets/sdgs/SDG_3.png'))}
                          src={require('../../../assets/sdgs/SDG_3.png')}
                        // src={src}
                        />

                        <Tag
                          showTag={this.showTag}
                          // showTag={this.showTag(require('../../../assets/sdgs/SDG_3.png'))}
                          src={require('../../../assets/sdgs/SDG_13.png')}
                        // src={src}
                        />

                        <Tag
                          showTag={this.showTag}
                          // showTag={this.showTag(require('../../../assets/sdgs/SDG_3.png'))}
                          src={require('../../../assets/sdgs/SDG_14.jpg')}
                        // src={src}
                        />

                        <Tag
                          showTag={this.showTag}
                          // showTag={this.showTag(require('../../../assets/sdgs/SDG_3.png'))}
                          src={require('../../../assets/sdgs/SDG_6.png')}
                        // src={src}
                        />
                      </View>
                    )}
                  <View />
                </View>
              )}
          </Fragment>
          <TagDisplay
            showTag={this.showTag}
            visibility={showTag}
            imageSource={src}
          />

          <View style={{ paddingTop: 5 }}>
            <View>
              <Text style={{ color: '#696F74' }}>  Additional Documents </Text>
            </View>
            <PdfBox />
          </View>
        </View>
      </View>
    );
  }
}

OverView.defaultProps = {};

OverView.propTypes = {};
